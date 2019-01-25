import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer, Query } from 'react-apollo';
import client from '../apolloClient';
import AuthLogoutButton from './AuthLogoutButton';
import AuthLoginLink from './AuthLoginLink';
import { AuthMenuQuery } from './__generated__/AuthMenuQuery';
import AuthUserDataFragment from './AuthUserDataFragment';

class AuthGetCurrentUserQuery extends Query<AuthMenuQuery, {}> {}

export default function AuthMenu() {
  return (
    <AuthGetCurrentUserQuery
      query={gql`
        query AuthMenuQuery {
          ...AuthUserDataFragment
        }
        ${AuthUserDataFragment}
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return '...';
        if (error) return `Error! ${error.message}`;

        // if user exists
        if (data && data.me && data.me.user && data.me.user.login) {
          return (
            <span>
              <b>
                {data.me.user.login} ({(data.me.user as any).name})
              </b>{' '}
              <AuthLogoutButton />
            </span>
          );
        }

        return <AuthLoginLink />;
      }}
    </AuthGetCurrentUserQuery>
  );
}
