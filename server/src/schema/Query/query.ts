import { IResolvers } from '../../__generated__/graphql';

const Query: IResolvers['Query'] = {
  hello: () => '123',
  user: (_, args) => {
    return { name: '123', articles: [{ title: 'a' }, {title: 'b'} ] };
  }
};

export default Query;