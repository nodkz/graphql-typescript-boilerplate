import React, { Component, ComponentType, ComponentClass } from 'react';
import { Query } from 'react-apollo';
import { DocumentNode } from 'graphql';

interface LoaderProps {
  component: ComponentType<any>; // TODO: fix
  query: DocumentNode;
  variables?: {};
}

export default function MyQuery({ component: Cmp, query, variables }: LoaderProps) {
  return (
    <Query query={query} variables={variables}>
      {({ loading, error, data }) => {
        if (loading) {
          return `Loading`;
        }
        if (error) {
          return `Error!: ${error}`;
        }

        return <Cmp data={data} />;
      }}
    </Query>
  );
}
