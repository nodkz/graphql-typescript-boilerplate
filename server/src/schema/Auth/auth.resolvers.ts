import { IResolvers } from '../__generated__/graphql';
import Auth from '../../auth';
import { prepareContext } from '../context';

const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { login, password }, context) => {
      const { req, res } = context;
      const { token } = Auth.authenticate(req, res, login, password) || null;

      if (token) {
        const newContext = await prepareContext({ req, res });
        Object.keys(newContext).forEach(f => {
          context[f] = newContext[f];
        });
      }

      return {
        query: {} as any,
        ok: !!token,
        token,
      };
    },
    logout: (_, __, context) => {
      const { req, res, hasRole } = context;
      if (hasRole('guest')) {
        throw new Error('You are GUEST. And cannot logout');
      }
      Auth.logout(req, res);
      return true;
    },
  },
};

export default resolvers;
