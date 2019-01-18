import React, { Component } from 'react';
import gql from 'graphql-tag';
import MyQuery from './MyQuery';
import aaa from './fragment';

class User extends Component {
  public render() {
    return (
      <div>
        <h1>User: </h1>
        <p>{JSON.stringify(this.props)}</p>
      </div>
    );
  }
}

const bbb = gql`
  fragment ARTS444 on Article {
    createdAt
  }
`;

export const UserQuery = gql`
  query User($id: Int!) {
    user(id: $id) {
      name
      articles {
        ...ARTS
      }
    }
  }

  ${aaa}
`;

export default () => <MyQuery component={User} query={UserQuery} variables={{ id: 123 }} />;
