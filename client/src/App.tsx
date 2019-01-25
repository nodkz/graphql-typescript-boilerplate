import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError, ErrorLink } from 'apollo-link-error';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'whatwg-fetch';
import './App.css';
import User from './components/User';
import Hello from './components/Hello';
import MainPage from './components/MainPage';
import Menu from './components/Menu';
import Page404 from './components/Page404';
import Login from './components/Login';
const browserHistory = createBrowserHistory();

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
(window as any).aaa = cache;

client.query({
  query: gql`
    query Auth {
      hello
    }
  `,
});

class App extends Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Router history={browserHistory}>
          <div style={{ paddingTop: '10px' }}>
            <Menu />
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/user" component={User} />
              <Route path="/hello" component={Hello} />
              <Route path="/login" component={Login} />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
