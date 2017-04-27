import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from "graphql"

import QLMovie from "./Movie"
import Movie from "../models/movies"

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query",
  fields: () => {
    return {
      movies: {
        type: new GraphQLList(QLMovie),
        resolve(root, args) {
          return Movie.find({})
        }
      }
    }
  }
})

export default Query


