import {
  GraphQLObjectType,
  GraphQLString,
} from "graphql"

const Movie = new GraphQLObjectType({
  name: "Movie",
  description: "Movie",
  fields: () => {
    return {
      allocineId: {
        type: GraphQLString,
        resolve(movie) {
          return movie.allocineId
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
    }
  }
})

export default Movie


