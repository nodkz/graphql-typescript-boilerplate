import React, { Component } from 'react';
import Loading from 'react-loading';
import { Jumbotron } from 'react-bootstrap';
// TODO: implement new way for endpoint
// import { relayStore } from 'clientStores';

interface Props {
  endpoint: string;
}
export default class LoadingPage extends React.Component<Props> {
  public render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h2>
          One moment, please...
          <br />
          <small>
            Waiting while warming up GraphQL server on Heroku and data returns
            <br />
            <a href={this.props.endpoint} target="_blank">
              {this.props.endpoint}
            </a>
          </small>
        </h2>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-5">
            <Loading type="bubbles" color="#3385b5" />
          </div>
        </div>
      </Jumbotron>
    );
  }
}
