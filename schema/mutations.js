const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const UserType = require('./UserType');
const User = require('../models/User');
const { register, login, verifyUser } = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        handle: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        password2: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, data) {
        return register(data);
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, data) {
        return login(data);
      },
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
      },
      resolve(_, data, ctx) {
        return verifyUser(data);
      },
    },
  },
});

module.exports = mutation;
