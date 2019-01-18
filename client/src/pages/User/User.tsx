import React, { Component } from 'react';
import gql from 'graphql-tag';
import { UserHOC, UserVariables } from '../../__generated__/components';
import { number } from 'prop-types';

interface IUser {}

class User extends Component {
  public render() {
    return (
      <div>
        <p>User id:</p>
      </div>
    );
  }
}

export const USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      name
    }
  }
`;

export default User;
