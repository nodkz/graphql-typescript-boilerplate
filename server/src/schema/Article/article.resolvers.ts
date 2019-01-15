import { IResolvers } from '../__generated__/graphql';
import { test } from './utils';

const resolvers: IResolvers = {
  Article: {
    title: test,
  },
  ArticleMutations: {
    create: () => {
      console.log('Article added');
      return Date.now();
    },
    update: () => {
      console.log('Article added');
      return Date.now();
    },
    remove: () => {
      console.log('Article added');
      return Date.now();
    },
  },
  Mutation: {
    article: () => ({}),
  },
};

export default resolvers;
