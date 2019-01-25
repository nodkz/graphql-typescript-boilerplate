import React from 'react';
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

interface Props {
  client: ApolloClient<any>;
}

class AuthLogoutButton extends React.Component<Props> {
  public logout = async () => {
    const { client } = this.props;
    const res = await client.mutate({
      mutation: gql`
        mutation AuthLogout {
          logout
        }
      `,
    });
    client.resetStore();
  };

  public render() {
    return <button onClick={this.logout}>Logout</button>;
  }
}

export default withApollo<{}>(AuthLogoutButton);
