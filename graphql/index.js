const { GraphQLSchema } = require('graphql');
const MutationType = require('./mutation');
const QueryType = require('./query');
const SubscriptionType = require('./subscription');
const graphQLSchemaConfig = {
    query: QueryType,
    mutation: MutationType,
    subscription: SubscriptionType,
};

module.exports = new GraphQLSchema(graphQLSchemaConfig);
