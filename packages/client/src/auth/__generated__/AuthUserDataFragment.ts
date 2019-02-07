/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AuthUserDataFragment
// ====================================================

export interface AuthUserDataFragment_me_user {
  __typename: "User";
  id: number;
  login: string | null;
  name: string | null;
}

export interface AuthUserDataFragment_me {
  __typename: "Me";
  user: AuthUserDataFragment_me_user | null;
}

export interface AuthUserDataFragment {
  __typename: "Query";
  me: AuthUserDataFragment_me | null;
}
