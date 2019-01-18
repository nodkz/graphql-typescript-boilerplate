import React, { Component } from 'react';
import gql from 'graphql-tag';
import MyQuery from './MyQuery';

class Hello extends Component {
  public render() {
    return (
      <div>
        <h1>Hello: </h1>
        <p>{JSON.stringify(this.props)}</p>
      </div>
    );
  }
}

export const HelloQuery = gql`
  query Hello {
    hello
  }
`;

export default () => <MyQuery component={Hello} query={HelloQuery} />;
