import * as mongoose from "mongoose"
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql"

import QLShowtime from './Showtime'
const Showtime = mongoose.model("showtimes");

const Theater: GraphQLObjectType = new GraphQLObjectType({
  name: "Theater",
  description: "Theater",
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve(theater) {
        return theater._id
      }
    },
    name: {
      type: GraphQLString,
      resolve(theater) {
        return theater.name
      }
    },
    address: {
      type: GraphQLString,
      resolve(theater) {
        return theater.address
      }
    },
    network: {
      type: GraphQLString,
      resolve(theater) {
        return theater.network
      }
    },
    showtimes: {
      type: new GraphQLList(QLShowtime),
      resolve(theater) {
        return Showtime.find({ theaterId: theater._id })
      }
    },
  })
})

export default Theater
