const {GraphQLSchema} = require('graphql')
const RootQueryType = require("./RootQuery");
const mutations = require("./mutations");

// add our mutations to the Schema
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
