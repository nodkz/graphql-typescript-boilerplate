import { GraphQLScalarType, Kind } from 'graphql';
import { IResolvers } from './__generated__/graphql';

const resolvers: IResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    // Output: Date -> "2019-01-20"
    serialize(value) {
      return new Date(value).toISOString().slice(0, 10);
    },
    // Input: "2019-01-20" -> Date
    parseValue(value) {
      return new Date(value); // value from the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};

export default resolvers;
