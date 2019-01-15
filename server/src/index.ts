import { ApolloServer, gql } from 'apollo-server';
import resolvers from './schema/resolvers';
import { typeDefs } from './__generated__/graphql';

const server = new ApolloServer({
  typeDefs: typeDefs as any,
  resolvers: resolvers as any,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
