/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AuthLoginFormMutation
// ====================================================

export interface AuthLoginFormMutation_login_query_me_user {
  __typename: "User";
  id: number;
  login: string | null;
  name: string | null;
}

export interface AuthLoginFormMutation_login_query_me {
  __typename: "Me";
  user: AuthLoginFormMutation_login_query_me_user | null;
}

export interface AuthLoginFormMutation_login_query {
  __typename: "Query";
  me: AuthLoginFormMutation_login_query_me | null;
}

export interface AuthLoginFormMutation_login {
  __typename: "LoginPayload";
  query: AuthLoginFormMutation_login_query | null;
}

export interface AuthLoginFormMutation {
  login: AuthLoginFormMutation_login | null;
}

export interface AuthLoginFormMutationVariables {
  login: string;
  password: string;
}
