import * as mongoose from "mongoose"
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql"

const Showtime = mongoose.model("showtimes");

import QLShowtime from './Showtime'

const Movie = new GraphQLObjectType({
  name: "Movie",
  description: "Movie",
  fields: () => {
    return {
      _id: {
        type: GraphQLString,
        resolve(movie) {
          return movie._id
        }
      },
      title: {
        type: GraphQLString,
        resolve(movie) {
          return movie.title
        }
      },
      poster: {
        type: GraphQLString,
        resolve(movie) {
          return movie.poster
        }
      },
      releaseDate: {
        type: GraphQLString,
        resolve(movie) {
          return movie.releaseDate
        }
      },
      showtime: {
        type: new GraphQLList(QLShowtime),
        resolve(movie) {
          return Showtime.find({ movieId: movie._id })
        }
      }
    }
  }
})

export default Movie


