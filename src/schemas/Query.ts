import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
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
        args: {
          title: { type: GraphQLString },
        },
        type: new GraphQLList(QLMovie),
        resolve(root, args) {
          const title = args.title;
          const req = (title && title != '')
            ? { title: new RegExp(`.*${title}.*`, "i")}
            : {};
          return Movie.find(req).sort({releaseDate: -1})
        }
      },
      movie: {
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        type: QLMovie,
        resolve(root, args) {
          return Movie.findOne({ _id: args.id })
        }
      },
      theaters: {
        type: new GraphQLList(QLTheater),
        resolve(root, args) {
          return Theater.find({})
        }
      },
      theater: {
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        type: QLTheater,
        resolve(root, args) {
          return Theater.findOne({_id: args.id})
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
