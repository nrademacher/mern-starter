const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = require('./UserType');
const User = require('../models/User')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }, email: {type: GraphQLString} },
      async resolve(_, {id}, ctx) {
        console.log(id)
        const user = await User.findById(id)    
if (user) return user
      },
    },
  },
});

module.exports = RootQuery

