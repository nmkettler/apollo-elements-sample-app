import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './custom_server/src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context: {
    db,
    pubsub
  }
})

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`)
})

// // EXPERIMENTAL SERVER
// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const cors = require('cors');
// const schema = require('./schema');
// const path = require('path');

// const app = express();

// // Allow cross-origin
// app.use(cors());

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     graphiql: true
//   })
// );

// app.use(express.static('public'));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
