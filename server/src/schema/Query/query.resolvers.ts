import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  Query: {
    hello: (_, __, context) => {
      if (context.user) {
        return `Hi, ${context.user.login}!!!`;
      }
      return `Hello, anon from ip ${context.ip}`;
    },
  },
};

export default resolvers;
