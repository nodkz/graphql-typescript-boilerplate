import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

function AuthLoginLink(props: RouteComponentProps) {
  if (props.location.pathname === '/login') return null;
  return <button onClick={() => props.history.push('/login')}>Login</button>;
}

export default withRouter(AuthLoginLink);
