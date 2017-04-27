import {
  GraphQLObjectType,
  GraphQLString,
} from "graphql"

const Theater = new GraphQLObjectType({
  name: "Theater",
  description: "Theater",
  fields: () => {
    return {
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
    }
  }
})

export default Theater
