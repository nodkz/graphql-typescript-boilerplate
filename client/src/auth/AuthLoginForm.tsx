import React, { Component } from 'react';
import { withApollo, Mutation } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { Form as RFForm, Field as RFField } from 'react-final-form';
import AuthUserDataFragment from './AuthUserDataFragment';

import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import gql from 'graphql-tag';

interface Props {
  client: ApolloClient<any>;
}

class AuthLoginForm extends Component<Props> {
  public submit = (values: any, form: any): any => {
    console.log(values, form);
  };

  public render() {
    return (
      <Mutation
        mutation={gql`
          mutation LoginFormMutation($login: String!, $password: String!) {
            login(login: $login, password: $password) {
              token
              query {
                ...AuthUserDataFragment
              }
            }
          }
          ${AuthUserDataFragment}
        `}
      >
        {(submitMutation, { data, client }) => (
          <RFForm
            initialValues={{ login: 'admin', password: '' }}
            onSubmit={async values => {
              const result: any = await submitMutation({ variables: values });
              if (result && result.data && result.data.login && result.data.login.token) {
                client.resetStore();
              } else {
                alert('Incorrect password');
              }
            }}
            subscription={{
              submitting: true,
              pristine: true,
            }}
            render={({ handleSubmit }) => (
              <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <FormGroup controlId="email" bsSize="large">
                  <ControlLabel>Login</ControlLabel>
                  <RFField
                    name="login"
                    validate={v => (!v ? 'Required' : undefined)}
                    render={({ input, meta }) => <FormControl {...input} />}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password</ControlLabel>
                  <RFField
                    name="password"
                    // validate={v => (!v ? 'Please enter password' : undefined)}
                    render={({ input, meta }) => (
                      <div>
                        <FormControl type="password" {...input} />
                        {meta.error && meta.touched && <h2>{meta.error}</h2>}
                      </div>
                    )}
                  />
                </FormGroup>
                <Button block bsSize="large" onClick={handleSubmit as any}>
                  Login
                </Button>
              </div>
            )}
          />
        )}
      </Mutation>
    );
  }
}

export default withApollo<{}>(AuthLoginForm);
