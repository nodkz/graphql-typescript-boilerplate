import gql from 'graphql-tag';

export default gql`
  fragment AuthUserDataFragment on Query {
    me {
      user {
        id
        login
        name
      }
    }
  }
`;
