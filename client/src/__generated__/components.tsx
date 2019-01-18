export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export interface UserVariables {}

export interface UserQuery {
  __typename?: 'Query';

  user: Maybe<UserUser>;
}

export interface UserUser {
  __typename?: 'User';

  name: string;
}

import * as ReactApollo from 'react-apollo';
import * as React from 'react';

import gql from 'graphql-tag';

// ====================================================
// Components
// ====================================================

export const UserDocument = gql`
  query User {
    user(id: 1) {
      name
    }
  }
`;
export class UserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<UserQuery, UserVariables>>
> {
  public render() {
    return (
      <ReactApollo.Query<UserQuery, UserVariables>
        query={UserDocument}
        {...(this as any).props as any}
      />
    );
  }
}
export type UserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<UserQuery, UserVariables>
> &
  TChildProps;
export function UserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<TProps, UserQuery, UserVariables, UserProps<TChildProps>>
    | undefined
) {
  return ReactApollo.graphql<TProps, UserQuery, UserVariables, UserProps<TChildProps>>(
    UserDocument,
    operationOptions
  );
}
