import React, { Component } from 'react';
import gql from 'graphql-tag';
import MyQuery from './MyQuery';

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

export const UserQuery = gql`
  query User($id: Int!) {
    user(id: $id) {
      name
    }
  }
`;

export default () => <MyQuery component={User} query={UserQuery} variables={{ id: 123 }} />;
