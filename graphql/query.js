const gql = require('graphql');
const BookType = require('./types/book');
const Books = require('./fakeData');
const QueryType = new gql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        books: {
            type: gql.GraphQLList(BookType),
            resolve: () => Books,
        },
    }),
});

module.exports = QueryType;
