import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from "graphql"

const Showtime = new GraphQLObjectType({
  name: "Showtime",
  description: "Showtime",
  fields: () => {
    return {
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
      date: {
        type: GraphQLString,
        resolve(showtime) {
          return showtime.date
        }
      },
      version: {
        type: GraphQLString,
        resolve(showtime) {
          return showtime.version
        }
      },
      times: {
        type: new GraphQLList(GraphQLString),
        resolve(showtime) {
          return showtime.times
        }
      },
    }
  }
})

export default Showtime
