var path = require('path');
var fs = require('fs');
import * as express from "express"
import * as GraphHttp from "express-graphql"
import "./models/db"
import schema from "./schemas/schema"
import * as mongoose from "mongoose"

const APP_PORT = 3000

const Movie = mongoose.model("movies");
const http = require('http');

const app = express()

app.use(express.static(__dirname + '/../public'))

app.use("/graphql", GraphHttp(request => ({
  schema,
  pretty: true,
  graphiql: true,
  rootValue: {
    request: request,
  }
})))

app.get("/poster/:id", (req, res) => {
  const { id } = req.params;
  const localPath = path.join(__dirname + '/../public/posters/' + id);
  console.log(localPath)
  if (fs.existsSync(localPath)) {
    res.contentType("image/jpg").sendFile(localPath);
  } else {
    Movie.findOne({_id: id}).exec(
      (err, doc: any) => {
        if (doc) {
          const url = `http://fr.web.img3.acsta.net${doc.poster}`;
          console.log("Caching "+url);
          const file = fs.createWriteStream(localPath);
          http.get(url, (response: any) => response.pipe(file))
          setTimeout(() => res.contentType("image/jpg").sendFile(localPath), 300);
        } else res.end("Incorrect movie")
      }
    )
  }
})

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`)
})
