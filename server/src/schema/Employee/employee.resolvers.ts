import { IResolvers } from '../__generated__/graphql';
import { chain } from 'lodash';
import DataLoader from 'dataloader';
import _employeesData from '../__data__/employees.json';

const employeesData = chain(
  _employeesData.map((o, i) => {
    return { _id: `${i + 1}`, ...o } as object; // tslint:disable-line
  })
);

// HACK for logging
function withLog(data: any) {
  const ids = Array.isArray(data) ? data.map(o => o._id) : [data._id];
  console.log(
    `[${new Date().getSeconds()}] Call DB: returned ${ids.length} records with ids [${ids.join(
      ','
    )}]`
  );
  return data;
}

export { employeesData };

const resolvers: IResolvers = {
  Query: {
    employee: (_, args) => {
      return withLog(employeesData.find({ _id: args.id }).value() as any) || null;
    },
    employees: (_, args) => {
      return (
        withLog(employeesData
          .filter({ ...args.filter })
          .drop(args.offset || 0)
          .take(args.limit)
          .value() as any) || []
      );
    },
  },
  Employee: {
    reportsID: ({ reportsTo }: any) => reportsTo,
    // reportsTo: ({ reportsTo }: any) => {
    //   if (!reportsTo || !Number.isInteger(reportsTo)) {
    //     return null;
    //   }
    //   return withLog(employeesData.find({ employeeID: reportsTo }).value() as any);
    // },
    reportsTo: ({ reportsTo }: any, _, context, info) => {
      const { dataloaders } = context;

      // единожы инициализируем DataLoader для получения авторов по ids
      let dl = dataloaders.get(info.fieldNodes);
      if (!dl) {
        dl = new DataLoader(async (ids: any[]) => {
          // обращаемся в базу чтоб получить авторов по ids
          const rows = await withLog(
            employeesData
              .keyBy('_id')
              .at(ids)
              .value()
          );
          // IMPORTANT: сортируем данные из базы в том порядке, как нам передали ids
          const sortedInIdsOrder = ids.map(id => rows.find((x: any) => x._id === id));
          return sortedInIdsOrder;
        });
        // ложим инстанс дата-лоадера в WeakMap для повторного использования
        dataloaders.set(info.fieldNodes, dl);
      }

      if (!reportsTo || !Number.isInteger(reportsTo)) {
        return null;
      }
      return dl.load(reportsTo) as any;
    },
    subordinates: ({ employeeID }) => {
      return withLog(employeesData.filter({ reportsTo: employeeID }).value() as any);
    },
  },
};

export default resolvers;
