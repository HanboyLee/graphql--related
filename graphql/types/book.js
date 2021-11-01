const gql = require('graphql');

const BookType = new gql.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: gql.GraphQLID },
        title: { type: gql.GraphQLString },
        author: { type: gql.GraphQLString },
    }),
});

module.exports = BookType;
