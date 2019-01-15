import { ApolloServer, gql } from 'apollo-server';
import { schema, prepareContext } from './schema';

const server = new ApolloServer({
  schema,
  context: prepareContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
