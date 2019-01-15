const { GraphQLSchema, printSchema } = require("graphql");

exports.plugin = async schema => {
  const sdl = await printSchema(schema, { commentDescriptions: true });
  return sdl.replace(/(`|\\)/gim, "\\$1");
};
