import { IResolvers } from '../__generated__/graphql';

export default {
  User: {
    name: (_, __, context) => `${_.name} ${context.ip}`,
    articles: (source, args, context) => {
      return source.articles;
    }
  }
} as IResolvers;
