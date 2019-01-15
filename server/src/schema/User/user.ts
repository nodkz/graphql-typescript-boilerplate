import { IResolvers } from '../../__generated__/graphql';

const User: IResolvers['User'] = {
  name: (_, __, context) => `${_.name} ${context.ip}`,
  articles: (source, args, context) => {
    return source.articles;
  }
}

export default User;