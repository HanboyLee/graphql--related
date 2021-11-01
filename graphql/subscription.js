const gql = require('graphql');
const BookType = require('./types/book');
const Books = require('./fakeData');
const { pubsub, SB_BOOK, withFilter } = require('../utils/constants');

const SubscriptionType = new gql.GraphQLObjectType({
    name: 'Subscription',
    fields: () => ({
        subscribeBook: {
            type: BookType,

            args: {
                title: {
                    type: gql.GraphQLString,
                },
            },
            // resolve: (payload, args) => {
            //     console.log(payload.subscribeBook);
            //     console.log(args, 'args');
            //     return payload.subscribeBook;
            // },
            // subscribe: () => pubsub.asyncIterator(SB_BOOK),
            subscribe: withFilter(
                () => pubsub.asyncIterator(SB_BOOK),
                (payload, variables, context) => {
                    console.log(payload, variables);
                    console.log(context, 'context');
                    return payload.subscribeBook.title === variables.title;
                }
            ),
        },
    }),
});

module.exports = SubscriptionType;
