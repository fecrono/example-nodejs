import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';

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
httpServer.listen({ port: 3000 }, () => {
  console.log(`GraphQL API Server: 0.0.0.0:${3000}/graphql`);
});