import gql from 'graphql-tag';

export const aaa = gql`
  fragment aaa on Article {
    title
    desc
  }
`;

export default aaa;
