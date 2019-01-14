import { IResolvers } from '../../__generated__/graphql';
import { test } from './utils';

const Article: IResolvers['Article'] = {
  title: test,
}

export default Article;