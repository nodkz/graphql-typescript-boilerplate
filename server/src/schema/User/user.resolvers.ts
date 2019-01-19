import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  User: {
    ip: (_, __, context) => context.ip || 'no ip',
    articles: (source, args, context) => {
      return source.articles;
    },
  },
  Query: {
    user: (_, args) => {
      return {
        name: `User${args.id}`,
        ip: '',
        articles: [{ title: 'a' }, { title: 'b' }],
      };
    },
  },
};

export default resolvers;
