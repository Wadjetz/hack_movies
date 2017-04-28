import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLO,
} from "graphql"

import Movie from "../models/movies"
import Theater from "../models/theater"
import Showtime from "../models/Showtime"

import QLMovie from "./Movie"
import QLTheater from "./Theater"
import QLShowtime from "./Showtime"

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
      },
      movie: {
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        type: QLMovie,
        resolve(root, args) {
          return Movie.find({_id: args.id})
        }
      },
      theaters: {
        type: new GraphQLList(QLTheater),
        resolve(root, args) {
          return Theater.find({})
        }
      },
      showtimes: {
        type: new GraphQLList(QLShowtime),
        resolve(root, args) {
          return Showtime.find({})
        }
      },
    }
  }
})

export default Query


