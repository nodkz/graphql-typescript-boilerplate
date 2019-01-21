import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

interface Props {}
interface State {
  cnt: number;
}

export default class Page404 extends React.Component<Props, State> {
  public state: State = { cnt: 404 };

  public onClick() {
    this.setState({ cnt: this.state.cnt + 1 });
  }

  public render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h1 onClick={this.onClick} style={{ userSelect: 'none', cursor: 'pointer' }}>
          {this.state.cnt}
        </h1>
        <p>Страница не найдена</p>
      </Jumbotron>
    );
  }
}
