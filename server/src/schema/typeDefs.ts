import fs from 'fs';
import path from 'path';

const typeDefs = fs.readFileSync(
  path.resolve(__dirname, '../__generated__/combinedTypeDefs.graphql'), 
  { encoding: 'utf8' }
);

export default typeDefs;