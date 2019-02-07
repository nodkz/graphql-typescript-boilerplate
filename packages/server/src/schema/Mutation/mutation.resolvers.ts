import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  Mutation: {
    time: () => new Date().toDateString(),
  },
};

export default resolvers;
