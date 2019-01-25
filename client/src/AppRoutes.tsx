import React from 'react';
import { Switch, Route } from 'react-router';
import User from './components/User';
import Hello from './components/Hello';
import MainPage from './components/MainPage';
import Page404 from './components/Page404';
import Login from './auth/AuthLoginForm';
import OrderRoutes from './orders/OrderRoutes';

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/user" component={User} />
      <Route path="/hello" component={Hello} />
      <Route path="/login" component={Login} />
      <Route path="/orders" component={OrderRoutes} />
      <Route component={Page404} />
    </Switch>
  );
}
