import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (user) return {};
      return null;
    },
  },
  Me: {
    user: (_, __, { user }) => user,
    userData: (_, __, { hasRole }) => {
      if (!hasRole('user')) return null;
      return 'Some info for role USER';
    },
    adminData: (_, __, { hasRole }) => {
      if (!hasRole('admin')) return null;
      return 'Some info for role ADMIN';
    },
  },
};

export default resolvers;
