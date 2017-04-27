import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from "graphql"

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation",

  fields: () => ({
    bootstrap: {
      type: GraphQLString,
      resolve(root, args) {
        console.log("TEST");
        return 'TODO';
      }
    }
  })
})

export default Mutation
