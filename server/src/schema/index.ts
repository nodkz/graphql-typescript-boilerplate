import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './__generated__/graphql';
import { prepareContext } from './context';
import { mergeResolvers, fileLoader } from 'merge-graphql-schemas';

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "./**/*.resolvers.*")));

const schema = makeExecutableSchema({ typeDefs, resolvers });

export {
  schema,
  prepareContext,
};