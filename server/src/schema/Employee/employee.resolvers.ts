import { IResolvers } from '../__generated__/graphql';
import { chain } from 'lodash';
import _employeesData from '../__data__/employees.json';

const employeesData = chain(
  _employeesData.map((o, i) => {
    return { _id: `${i + 1}`, ...o } as object; // tslint:disable-line
  })
);

export { employeesData };

const resolvers: IResolvers = {
  Query: {
    employee: (_, args) => {
      return (employeesData.find({ _id: args.id }).value() as any) || null;
    },
    employees: (_, args) => {
      return (
        (employeesData
          .filter({ ...args.filter })
          .drop(args.offset || 0)
          .take(args.limit)
          .value() as any) || []
      );
    },
  },
  Employee: {
    reportsID: ({ reportsTo }: any) => reportsTo,
    reportsTo: ({ reportsTo }: any) => {
      if (!reportsTo || !Number.isInteger(reportsTo)) {
        return null;
      }
      return employeesData.find({ employeeID: reportsTo }).value() as any;
    },
    subordinates: ({ employeeID }) => {
      return employeesData.filter({ reportsTo: employeeID }).value() as any;
    },
  },
};

export default resolvers;
