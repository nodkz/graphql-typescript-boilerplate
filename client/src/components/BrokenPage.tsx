import React, { Component } from 'react';
import { Jumbotron, Button, Alert } from 'react-bootstrap';

interface Props {
  message: string;
}

export default class BrokenPage extends React.Component<Props> {
  public reloadPage = () => {
    if (window) {
      window.location.reload(true);
    }
  };

  public render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h1>
          {this.props.message ? (
            <Alert bsStyle="danger">{this.props.message}</Alert>
          ) : (
            <span>Shit happens!</span>
          )}
        </h1>
        <Button onClick={this.reloadPage}>Reload page</Button>
      </Jumbotron>
    );
  }
}
