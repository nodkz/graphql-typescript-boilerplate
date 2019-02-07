import React from 'react';
import gql from 'graphql-tag';
import { OrderListItemFragment } from './__generated__/OrderListItemFragment';

interface Props {
  order: OrderListItemFragment;
}

export default class OrderListItem extends React.Component<Props> {
  public static fragment = gql`
    fragment OrderListItemFragment on Order {
      _id
      orderID
      customer {
        companyName
      }
      employeeID
      employee {
        firstName
        lastName
        employeeID
      }
      orderDate
      freight
    }
  `;

  public render() {
    const { order } = this.props;
    const { employee } = order;

    return (
      <div>
        <div className="row">
          <div className="col-sm-1">{order.orderID}</div>
          <div className="col-sm-2">{order.customer && order.customer.companyName}</div>
          {employee && (
            <div className="col-sm-2">
              {employee.firstName} {employee.lastName} (id:{order.employeeID})
            </div>
          )}
          <div className="col-sm-2">
            {/* {order.shipper && order.shipper.companyName} (id:{order.shipVia}) */}
          </div>
          <div className="col-sm-2">{`${order.orderDate || ''}`.substr(0, 10)}</div>
          <div className="col-sm-2">{order.freight}</div>
        </div>
        {/* {order.orderID && <ToggleOrder id={order.orderID} />} */}
      </div>
    );
  }
}
