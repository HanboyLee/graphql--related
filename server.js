const express = require('express');
const app = express();
const cors = require('cors');
const { generateMessage, generateLocationMessage } = require('./utils');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const graphqlHTTP = require('graphql-in-motion_express-graphql');
const { execute, subscribe } = require('graphql');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { PubSub } = require('graphql-subscriptions');
const schema = require('./graphql/index');
const PORT = process.env.PORT || 3000;
//grqphql
const WS_PORT = process.env.PORT || 8080;

// const runSubscriptionServer = () => {
// const wsServer = createServer(app);

// wsServer.listen(WS_PORT, () => {
//     console.log(`Websocket Server is now running on ws://localhost:${WS_PORT}/api/subscriptions`);
// });

// SubscriptionServer.create(
//     {
//         schema,
//         execute,
//         subscribe,
//         onConnect: () => console.log('Websocket connection established'),
//         onDisconnect: () => console.log('Websocket connection terminated'),
//     },
//     {
//         server: wsServer,
//         path: '/subscriptions',
//     }
// );
// };
// runSubscriptionServer();

const buildOptions = async () => {
    return {
        schema,
        graphiql: true,
    };
};

app.use(
    '/graphql',
    cors(),
    graphqlHTTP((req) => ({
        schema,
        graphiql: true,
        context: req,
    }))
);
// app.get('/graphql', expressPlayground({ endpoint: '/v1' }));
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

// ==============NODE-CRON====================
// const cron = require('node-cron');
// const task = cron.schedule(
//     '0 * * * * *',

//     function () {
//         const datetime = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
//         console.log(datetime);
//     },
//     { timezone: 'Asia/Chungking' }
// );
// ==============NODE-CRON====================

// const io = require('socket.io')(wsServer);
// let allClients = [];
// io.on('connection', (socket) => {
//     allClients.push(socket);
//     // console.log(path.join(__dirname, '/../public'));

//     // setInterval(() => {
//     // }, 3000);

//     socket.on('createMessage', (message, callback) => {
//         const newMessage = generateMessage({ from: message.from, text: message.text });
//         io.emit('newMessage', newMessage);
//     });

//     socket.on('createGeoLocationMessage', (coords) => {
//         io.emit('newMessage', generateLocationMessage({ from: 'ADMIN', lat: coords.lat, lng: coords.lng }));
//     });

//     socket.broadcast.emit('newMessage', generateMessage({ from: 'ADMIN', text: 'welcome to socket ' }));

//     socket.on('disconnect', (test) => {
//         var i = allClients.indexOf(socket);
//         allClients.splice(i, 1);
//         io.emit('newMessage', generateMessage({ from: 'user', text: '有人離開聊天室' }));
//         socket.disconnect();
//     });
// });
