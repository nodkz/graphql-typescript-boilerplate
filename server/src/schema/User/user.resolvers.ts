import { IResolvers } from '../__generated__/graphql';

export default {
  User: {
    ip: (_, __, context) => (context.ip || 'no ip'),
    articles: (source, args, context) => {
      return source.articles;
    }
  },
  Query: {
    user: (_, args) => {
      return { name: `User${args.id}`, ip: '', articles: [{ title: 'a' }, {title: 'b'} ] };
    }
  },
} as IResolvers;
