import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from "graphql"

import QLMovie from "./Movie"
import QLTheater from "./Theater"
import QLShowtime from "./Showtime"

import Movie from "../models/movies"
import Theater from "../models/theater"
import Showtime from "../models/Showtime"

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


