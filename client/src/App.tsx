import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'whatwg-fetch';
import User from './components/User';
import Hello from './components/Hello';
import MainPage from './components/MainPage';
import Menu from './components/Menu';
import Page404 from './components/Page404';
import Login from './auth/AuthLoginForm';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import './App.css';

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
