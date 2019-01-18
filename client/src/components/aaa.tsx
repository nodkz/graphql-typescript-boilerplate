import gql from 'graphql-tag';
import { AnyAaaaRecord } from 'dns';

export const aaa = gql`
  fragment aaa on Article {
    title
    desc
  }
`;

export default aaa;
