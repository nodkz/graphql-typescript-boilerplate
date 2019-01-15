import { IResolvers } from '../../__generated__/graphql';

export default {
  Mutation: { 
    log: () => {
      console.log(new Date());
      return '123';
    },
  }
} as IResolvers;