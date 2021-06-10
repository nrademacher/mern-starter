const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = require('./UserType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return users.find((user) => user.id === args.id);
      },
    },
  },
});

module.exports = RootQuery

