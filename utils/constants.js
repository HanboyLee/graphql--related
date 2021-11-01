const { PubSub, withFilter } = require('graphql-subscriptions');

const pubsub = new PubSub();
const SB_BOOK = 'subscribe_Book';

module.exports = {
    withFilter,
    pubsub,
    SB_BOOK,
};
