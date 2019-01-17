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

const browserHistory = createBrowserHistory();

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  fetch,
  // credentials: 'same-origin',
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
  // errorLink,
  // requestHandler,
  // stateLink,
  httpLink,
]);

const client = new ApolloClient({ cache, link });
(window as any).aaa = cache;

const q = gql`
  query {
    hello
  }
`;

console.log(q);

client
  .query({
    query: q,
  })
  .then(r => console.log(r));

class App extends Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Router history={browserHistory}>
          <div className="App">
            <div>
              <p>
                Edit <code>src/App.tsx</code> and save to reload!!!!
                <a href="https://reactjs.org">Learn React</a>
              </p>
            </div>
            <div>
              <Link to="/">Home</Link> <Link to="/aaa">AAA</Link> <Link to="/bbb">BBB</Link>
            </div>

            <Switch>
              <Route path="/aaa" render={() => <div>aaa</div>} />
              <Route path="/bbb" render={() => <div>bbb</div>} />
              <Route render={() => <div>home</div>} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
