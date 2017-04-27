import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from "graphql"

import bootstrap from '../bootstrap'

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation",

  fields: () => ({
    bootstrap: {
      type: GraphQLString,
      resolve(root, args) {
        bootstrap();
        return 'TODO';
      }
    }
  })
})

export default Mutation
