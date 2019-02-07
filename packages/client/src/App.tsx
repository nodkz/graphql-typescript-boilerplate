import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Menu from './menu/Menu';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import './App.css';
import AppRoutes from './AppRoutes';

const browserHistory = createBrowserHistory();

interface AppProps {
  client: ApolloClient<NormalizedCacheObject>;
}

class App extends Component<AppProps> {
  public render() {
    const { client } = this.props;

    return (
      <ApolloProvider client={client}>
        <Router history={browserHistory}>
          <div style={{ paddingTop: '10px' }}>
            <Menu />
            <AppRoutes />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
