import { IResolvers } from '../__generated__/graphql';

export default {
  Query: {
    hello: (_, __, context) => `Hello, ${context.ip}`,
  }
} as IResolvers;