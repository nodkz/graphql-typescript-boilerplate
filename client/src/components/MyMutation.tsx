import React, { Component, ComponentType, ComponentClass } from 'react';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { FetchPolicy } from 'apollo-client';

interface LoaderProps {
  component: ComponentType<any>; // TODO: fix
  mutation: DocumentNode;
  variables?: {};
  fetchPolicy?: FetchPolicy;
}

export default function MyMutation({
  component: Cmp,
  mutation,
  variables,
  fetchPolicy = 'cache-first',
}: LoaderProps) {
  return (
    <Mutation fetchPolicy={fetchPolicy} mutation={mutation} variables={variables}>
      {(mutate: MutationFn, { loading, error, data, called, client }: MutationResult) => {
        if (loading) {
          return `Loading`;
        }
        if (error) {
          return `Error!: ${error}`;
        }

        return <Cmp data={data} />;
      }}
    </Mutation>
  );
}
