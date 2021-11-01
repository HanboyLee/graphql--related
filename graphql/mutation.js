const gql = require('graphql');
const BookType = require('./types/book');
const Books = require('./fakeData');
const { pubsub, SB_BOOK } = require('../utils/constants');

const MutationType = new gql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            args: {
                title: { type: gql.GraphQLString },
                author: { type: gql.GraphQLString },
            },
            resolve: async (_, { title, author }) => {
                const currentId = Books.length + 1;
                Books.push({ id: currentId, title, author });
                const newBookData = Object.assign({}, { id: currentId, title, author });
                pubsub.publish(SB_BOOK, { subscribeBook: newBookData });
                return newBookData;
            },
        },
    }),
});

module.exports = MutationType;
