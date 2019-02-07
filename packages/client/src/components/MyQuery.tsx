import React, { Component, ComponentType, ComponentClass } from 'react';
import { Query } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { FetchPolicy } from 'apollo-client';

interface LoaderProps {
  component: ComponentType<any>; // TODO: fix
  query: DocumentNode;
  variables?: {};
  fetchPolicy?: FetchPolicy;
}

export default function MyQuery({
  component: Cmp,
  query,
  variables,
  fetchPolicy = 'cache-first',
}: LoaderProps) {
  return (
    <Query fetchPolicy={fetchPolicy} query={query} variables={variables}>
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
