// DEMO component

import React, { Component } from 'react';

import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import MyMutation from '../components/MyMutation';
import gql from 'graphql-tag';
interface State {
  email: string;
  password: string;
  [key: string]: string;
}
class Login extends Component<{}, State> {
  public state = {
    email: '',
    password: '',
  };

  public validateForm() {
    const { email, password } = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = re.test(email);
    if (emailTest && password) {
      return true;
    }
    return false;
  }

  public handleChange = (event: any): any => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  public handleLogin = (event: React.FormEvent<Button>): any => {};

  public render() {
    return (
      <div className="Login">
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
        </FormGroup>
        <Button block bsSize="large" disabled={!this.validateForm()} onClick={this.handleLogin}>
          Login
        </Button>
      </div>
    );
  }
}

export const LoginMutation = gql`
  mutation Login {
    login(login: "admin", password: "admin") {
      token
    }
  }
`;

export default () => (
  <MyMutation fetchPolicy="network-only" component={Login} mutation={LoginMutation} />
);
