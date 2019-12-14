import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Instance Express
const app = express();

// Config for Apollo Server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true
})

server.applyMiddleware({ app });

const httpServer = createServer(app);

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    httpServer.listen({ port: PORT }, () => {
      console.log(`GraphQL API Server: 0.0.0.0:${PORT}/graphql`);
      console.log(`Mongo DB Service: ${MONGO_URI}`);
    });
  }).catch(err => {
    throw Error(err);
  })