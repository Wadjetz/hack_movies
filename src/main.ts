import * as express from "express"
import * as GraphHttp from "express-graphql"
import schema from "./schemas/schema"
import "./models/db"
const APP_PORT = 3000

const app = express()

app.get("/", (req, res) => {
  res.end("Hello World")
})

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
