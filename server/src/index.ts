import { ApolloServer, gql } from 'apollo-server';
import resolvers from './schema/resolvers';
import { typeDefs } from './__generated__/graphql';
import { prepareContext } from './schema/context'

const server = new ApolloServer({
  typeDefs: typeDefs as any,
  resolvers: resolvers as any,
  context: prepareContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
