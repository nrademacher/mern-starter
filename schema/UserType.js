const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
    fields: () => ({
    // Mongoose automatically generates an ID field for our models so we'll want to be able to return it
    _id: { type: GraphQLID },
    handle: { type: GraphQLString },
    email: { type: GraphQLString },
    // we'll be able to return a boolean to indicate if the user is logged In
    loggedIn: { type: GraphQLBoolean },
    // Adding token will allow us to generate and return an authentication token
    token: { type: GraphQLString }
  })
});

module.exports = UserType
