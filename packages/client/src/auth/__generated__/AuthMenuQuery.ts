/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthMenuQuery
// ====================================================

export interface AuthMenuQuery_me_user {
  __typename: "User";
  id: number;
  login: string | null;
  name: string | null;
}

export interface AuthMenuQuery_me {
  __typename: "Me";
  user: AuthMenuQuery_me_user | null;
}

export interface AuthMenuQuery {
  __typename: "Query";
  me: AuthMenuQuery_me | null;
}
