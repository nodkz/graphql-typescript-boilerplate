const { printSchema } = require('graphql');

exports.plugin = async schema => {
  const sdl = await printSchema(schema, { commentDescriptions: true });
  return 'export const typeDefs = `\n' + sdl.replace(/(`|\\)/gim, '\\$1') + '\n`;\n';
};
