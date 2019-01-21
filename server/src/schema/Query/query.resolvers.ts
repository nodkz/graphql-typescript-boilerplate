import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  Query: {
    hello: (_, __, context) => {
      const req = context.req as any;
      if (req.user) {
        return `Hi, ${req.user.login}`;
      }
      return `Hello, anon from ip ${context.ip}`;
    },
  },
};

export default resolvers;
