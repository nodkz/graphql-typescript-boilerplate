import { ApolloServer, gql } from 'apollo-server';
import path from 'path';
import { typeDefs } from './__generated__/graphql';
import { prepareContext } from './schema/context';
import { mergeResolvers, fileLoader } from 'merge-graphql-schemas';

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "./schema/**/*.resolvers.*")));

const server = new ApolloServer({
  typeDefs: typeDefs as any,
  resolvers: resolvers as any,
  context: prepareContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
