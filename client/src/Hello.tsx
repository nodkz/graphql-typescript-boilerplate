import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default class Hello extends Component {
  public render() {
    return (
      <Query
        fetchPolicy="network-only"
        query={gql`
          query User {
            hello
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
