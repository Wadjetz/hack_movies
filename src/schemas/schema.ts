import { GraphQLSchema } from "graphql"
import Query from "./Query"
import Mutation from "./Mutation"

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

export default Schema