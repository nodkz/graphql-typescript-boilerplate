import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { number } from 'prop-types';

interface Props {
  onFilter: (
    data: {
      readonly employeeID?: number | undefined;
      readonly shipperID?: number | undefined;
      readonly shipVia?: number | undefined;
    }
  ) => any;
}

interface State {
  readonly employeeID: number | undefined;
  readonly shipperID: number | undefined;
  [fname: string]: number | undefined;
}

export default class OrderFilter extends React.Component<Props, State> {
  public state = {
    employeeID: undefined,
    shipperID: undefined,
  };

  public onChange = (e: React.FormEvent<FormControl>) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const fname = target.getAttribute('data-name');
      if (fname === 'employeeID' || fname === 'shipperID') {
        this.setState({ [fname]: parseInt(target.value, 10) || undefined }, this.onFilter);
      }
    }
  };

  public onClear = () => {
    this.setState(
      {
        employeeID: undefined,
        shipperID: undefined,
      },
      this.onFilter
    );
  };

  public onFilter = (e?: React.FormEvent<Button>): any => {
    if (e) {
      e.preventDefault();
    }

    if (this.props.onFilter) {
      const { employeeID, shipperID } = this.state;

      this.props.onFilter({
        employeeID: employeeID ? employeeID : undefined,
        shipVia: shipperID ? shipperID : undefined,
      });
    }
  };

  public render() {
    const { employeeID, shipperID } = this.state;

    return (
      <Form inline>
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>EmployeeID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="employeeID"
            value={employeeID || ''}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>{' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>ShipperID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="shipperID"
            value={shipperID || ''}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>{' '}
        <Button type="submit" bsStyle="primary" onClick={this.onFilter}>
          Filter
        </Button>{' '}
        <Button type="submit" onClick={this.onClear}>
          Clear
        </Button>
      </Form>
    );
  }
}
