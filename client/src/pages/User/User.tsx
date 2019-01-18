import React, { Component } from 'react';
import gql from 'graphql-tag';

export default class User extends Component {
  public render() {
    return (
      <div>
        <p>User 1</p>
      </div>
    );
  }
}

export const USER = gql`
  query User {
    user(id: 1) {
      name
    }
  }
`;
