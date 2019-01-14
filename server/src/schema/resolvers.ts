import Query from './Query/query';
import User from './User/user';
import Article from './Article/article';
import { IResolvers } from '../__generated__/graphql';

const resolvers: IResolvers = {
  Query,
  User,
  Article,
};

export default resolvers;