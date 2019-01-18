import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default class User extends Component {
  public render() {
    return (
      <Query
        query={gql`
          query User {
            user(id: 7) {
              name
            }
          }
        `}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <p>ERROR</p>;
          }

          return <div>{JSON.stringify(data)}</div>;
        }}
      </Query>
    );
  }
}
