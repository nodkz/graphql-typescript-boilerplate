import { IResolvers } from '../../__generated__/graphql';

const User: IResolvers['User'] = {
  articles: (_) => (_.articles)
}

export default User;