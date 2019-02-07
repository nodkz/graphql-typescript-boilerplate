import React, { Component, ComponentClass } from 'react';
import { Button } from 'react-bootstrap';
// import { QueryRenderer } from 'react-relay';
// import { relayStore } from 'clientStores';
import Loading from './Loading';
import ErrorBoundary from './ErrorBoundary';
import BrokenPage from './BrokenPage';

interface Props {
  component: ComponentClass<{ readonly data: object }>;
  query: () => any;
  variables?: object;
  prepareProps: (payload: object) => object;
}

interface State {
  isOpen: boolean;
  readonly data: object | null;
}

// TODO: migrate from relay to apollo
export default class Toggler extends React.Component<Props, State> {
  public state: State = {
    isOpen: false,
    data: null,
  };

  public toggle = () => {
    const { data, isOpen } = this.state;
    const { query, variables, prepareProps } = this.props;

    this.setState({
      isOpen: !isOpen,
    });

    // if (!data) {
    //   relayStore.fetch({ query, variables }).then(res => {
    //     this.setState({
    //       data: prepareProps(res),
    //     });
    //   });
    // }
  };

  public render() {
    const { component, query, variables, prepareProps } = this.props;
    const { data, isOpen } = this.state;

    return (
      <ErrorBoundary>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.toggle}
          children={isOpen ? 'close' : 'open'}
        />
        {isOpen && (
          <div className="lrspace bspace">
            {/* <QueryRenderer
              environment={relayStore.env}
              query={query}
              variables={variables}
              render={({ error, props }) => {
                if (error) {
                  return <BrokenPage message={error.message} />;
                } else if (props) {
                  return React.createElement(component, {
                    ...prepareProps(props),
                  });
                }
                return <Loading />;
              }}
            /> */}
          </div>
        )}
      </ErrorBoundary>
    );
  }
}
