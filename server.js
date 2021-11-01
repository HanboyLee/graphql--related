const express = require('express');
const app = express();
const cors = require('cors');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const graphqlHTTP = require('graphql-in-motion_express-graphql');
const { execute, subscribe } = require('graphql');
const schema = require('./graphql/index');
const PORT = process.env.PORT || 3000;

//grqphql
const buildOptions = async (req) => {
    return {
        schema,
        graphiql: true,
        context: req,
    };
};

app.use('/graphql', cors(), graphqlHTTP(buildOptions));

const httpServer = createServer(app);
const server = httpServer.listen(PORT, () => {
    console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});

SubscriptionServer.create(
    {
        schema,
        execute,
        subscribe,
        onConnect: () => console.log('Websocket connection established'),
        onDisconnect: () => console.log('Websocket connection terminated'),
    },
    {
        server: server,
        path: '/subscriptions',
    }
);
