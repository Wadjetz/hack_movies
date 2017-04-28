import * as mongoose from "mongoose"
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql"

import QLShowtime from './Showtime'
const Showtime = mongoose.model("showtimes");

const Movie: GraphQLObjectType = new GraphQLObjectType({
  name: "Movie",
  description: "Movie",
  fields: () => ({
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
    },
  })
})

export default Movie
