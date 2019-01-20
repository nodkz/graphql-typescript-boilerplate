import { IResolvers } from '../__generated__/graphql';
import { chain } from 'lodash';
import _productsData from '../__data__/products.json';

const productsData = chain(
  _productsData.map((o, i) => {
    return { _id: `${i + 1}`, ...o } as object; // tslint:disable-line
  })
);

export { productsData };

const resolvers: IResolvers = {
  Query: {
    product: (_, args) => {
      return (productsData.find({ _id: args.id }).value() as any) || null;
    },
    products: (_, args) => {
      return (
        (productsData
          .filter({ ...args.filter })
          .drop(args.offset || 0)
          .take(args.limit)
          .value() as any) || []
      );
    },
  },
};

export default resolvers;
