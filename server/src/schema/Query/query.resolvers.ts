import { IResolvers } from '../__generated__/graphql';

export default {
  Query: {
    hello: () => '123',
    user: (_, args) => {
      return { name: '123', articles: [{ title: 'a' }, {title: 'b'} ] };
    }
  }
} as IResolvers;