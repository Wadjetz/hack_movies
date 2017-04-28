var path = require('path');
import * as express from "express"
import * as GraphHttp from "express-graphql"
import "./models/db"
import schema from "./schemas/schema"
const APP_PORT = 3000

const app = express()

app.use(express.static(path.join(__dirname + '/../public')))

app.use("/graphql", GraphHttp(request => ({
  schema,
  pretty: true,
  graphiql: true,
  rootValue: {
    request: request,
  }
})))

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`)
})
