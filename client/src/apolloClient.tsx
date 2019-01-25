import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError, ErrorLink } from 'apollo-link-error';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  fetch,
  // credentials: 'same-origin',
  credentials: 'include',
  headers: {},
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ` + `${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([
  errorLink,
  // requestHandler,
  // stateLink,
  httpLink,
]);

const client = new ApolloClient({ cache, link });

// (window as any).aaa = cache;
// client.query({
//   query: gql-`
//     query Auth {
//       hello
//     }
//   `,
// });

export default client;
