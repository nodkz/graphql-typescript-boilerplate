import { IResolvers } from '../__generated__/graphql';
import Auth from '../../auth';

const resolvers: IResolvers = {
  Mutation: {
    login: (_, { login, password }, { req, res }) => {
      const token = Auth.authenticate(req, res, login, password);
      if (token) {
        return { token, ok: true };
      }
      return { ok: false };
    },
    logout: (_, __, { req, res }) => {
      Auth.logout(req, res);
      return true;
    },
  },
};

export default resolvers;
