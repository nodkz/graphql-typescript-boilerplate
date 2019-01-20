import { chain } from 'lodash';
import { IResolvers } from '../__generated__/graphql';
import _customersData from '../__data__/customers.json';

let customersData = chain(
  _customersData.map((o, i) => {
    return { _id: `${i + 1}`, ...o } as object; // tslint:disable-line
  })
);

const resolvers: IResolvers = {
  Query: {
    customer: (_, args) => {
      return (customersData.find({ _id: args.id }).value() as any) || null;
    },
    customers: (_, args) => {
      return (
        (customersData
          .filter({ ...args.filter })
          .drop(args.offset || 0)
          .take(args.limit)
          .value() as any) || []
      );
    },
  },
  Mutation: {
    customer: () => ({}),
  },
  CustomerMutations: {
    create: (_, { input }) => {
      const record = {
        _id: customersData.size().value() + 1,
        ...input,
      };
      customersData = chain(customersData.push(record).value());
      return {
        record: record as any,
      };
    },
  },
};

export default resolvers;
