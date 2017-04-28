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
    }
  }
})

export default Showtime
