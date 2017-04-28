import * as mongoose from "mongoose"
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from "graphql"

import QLMovie from './Movie'
const Movie = mongoose.model("movies");
import QLTheater from './Theater'
const Theater = mongoose.model("theaters");

const Showtime: GraphQLObjectType = new GraphQLObjectType({
  name: "Showtime",
  description: "Showtime",
  fields: () => ({
    movieId: {
      type: GraphQLString,
      resolve(showtime) {
        return showtime.movieId
      }
    },
    theaterId: {
      type: GraphQLString,
      resolve(showtime) {
        return showtime.theaterId
      }
    },
    version: {
      type: GraphQLString,
      resolve(showtime) {
        return showtime.version
      }
    },
    dates: {
      type: new GraphQLList(GraphQLString),
      resolve(showtime) {
        return showtime.dates
      }
    },
    movie: {
      type: new GraphQLList(QLMovie),
      resolve(showtime) {
        return Movie.find({ _id: showtime.movieId })
      }
    },
    theater: {
      type: new GraphQLList(QLTheater),
      resolve(showtime) {
        return Theater.find({ _id: showtime.theaterId })
      }
    },
  })
})

export default Showtime
