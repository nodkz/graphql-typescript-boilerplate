import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  Query: {
    hello: (_, __, context) => `Hello, ${context.ip}`,
  },
};

export default resolvers;
