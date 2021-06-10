const {GraphQLObjectType, GraphQLNonNull, GraphQLString} = require('graphql')
const UserType = require("./UserType");
const User = require('../models/User');
const {register} = require('../services/auth')

// our mutations are still configured in the fields of a GraphQLObjectType
const mutation = new GraphQLObjectType({
  // set the name to be indicative that this GraphQLObject will contain mutations
  name: "Mutation",
  fields: {
    // newUser will be the name of this mutation
    newUser: {
      // this mutation will create a new user so it will be of the User type
      type: UserType,
      args: {
        // since we *need* the name argument to make a new user
        // we'll make this argument GraphQLNonNull
        handle: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      // the resolve function will tell GraphQL how to run this mutation
      // in this case telling GraphQL to save this new User to our database
      resolve(parentValue, data) {
        // this would just be the mongoose model `save` function
        return register(data)
      }
    }
  }
});

module.exports = mutation
