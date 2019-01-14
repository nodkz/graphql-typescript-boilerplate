import { ApolloServer, gql } from 'apollo-server';
import resolvers from './schema/resolvers';
import typeDefs from './schema/typeDefs';

const server = new ApolloServer({
  typeDefs: typeDefs as any,
  resolvers: resolvers as any,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
