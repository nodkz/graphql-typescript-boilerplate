import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  Mutation: {
    log: () => {
      return '123456';
    },
  },
};

export default resolvers;
