import { join } from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, fileLoader } from 'merge-graphql-schemas';
import { typeDefs } from './__generated__/graphql';
import { prepareContext } from './context';

const resolvers = mergeResolvers(fileLoader(join(__dirname, './**/*.resolvers.*')));

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema, prepareContext };
