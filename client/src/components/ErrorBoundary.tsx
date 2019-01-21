import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  children: React.ReactNode;
}

interface State {
  readonly message: string | null;
  readonly componentStack: string | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { message: null, componentStack: null };

  public componentDidCatch(error: Error, info: any) {
    this.setState({
      message: error.message,
      componentStack: info.componentStack,
    });
  }

  public render() {
    const { message, componentStack } = this.state;
    if (message) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Alert bsStyle="danger" style={{ textAlign: 'left' }}>
            <b style={{ fontSize: '18px' }}>Error: {message}</b>
            <br />
            <pre style={{ fontSize: '10px', padding: '3px', margin: '10px 0 0 0' }}>
              {componentStack}
            </pre>
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}
