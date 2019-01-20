import { chain } from 'lodash';
import { IResolvers } from '../__generated__/graphql';
import _ordersData from '../__data__/orders.json';
import { customersData } from '../Customer/customer.resolvers';
import { employeesData } from '../Employee/employee.resolvers';
import { productsData } from '../Product/product.resolvers';

const ordersData = chain(
  _ordersData.map((o, i) => {
    return { _id: `${i + 1}`, ...o } as object; // tslint:disable-line
  })
);

const resolvers: IResolvers = {
  Query: {
    order: (_, args) => {
      return (ordersData.find({ _id: args.id }).value() as any) || null;
    },
    orders: (_, args) => {
      return (
        (ordersData
          .filter({ ...args.filter })
          .drop(args.offset || 0)
          .take(args.limit)
          .value() as any) || []
      );
    },
  },
  Order: {
    customer: ({ customerID }) => {
      if (!customerID) {
        return null;
      }
      return customersData.find({ customerID }).value() as any;
    },
    employee: ({ employeeID }) => {
      if (!employeeID) {
        return null;
      }
      return employeesData.find({ employeeID }).value() as any;
    },
  },
  OrderDetails: {
    product: ({ productID }) => {
      if (!productID) {
        return null;
      }
      return productsData.find({ productID }).value() as any;
    },
  },
};

export default resolvers;
