import React from 'react';
// import { createFragmentContainer, graphql } from 'react-relay';
import { Table } from 'react-bootstrap';
// import ToggleProduct from 'app/products/ToggleProduct';
// import type { OrderDetails_details } from './__generated__/OrderDetails_details.graphql';

interface Props {
  details: any; // OrderDetails_details
}

class OrderDetails extends React.Component<Props> {
  public render() {
    const { details } = this.props;

    if (!details) {
      return 'no order details';
    }

    return (
      <Table bordered condensed hover>
        <thead>
          <tr>
            <th>ProductID</th>
            <th>ProductName</th>
            <th>UnitPrice</th>
            <th>Quantity</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {details.map((row: any, i: number) => (
            <tr key={i}>
              <td>{row.productID}</td>
              <td>
                {row.product ? (
                  <span>
                    {row.product.name}{' '}
                    {row.productID ? (
                      <div id={row.productID}>{`ToggleProduct ${row.productID} DEV`}</div>
                    ) : null}
                    {/* {row.product.name} {row.productID ? <ToggleProduct id={row.productID} /> : null} */}
                  </span>
                ) : (
                  'no product data'
                )}
              </td>
              <td>{row.unitPrice}</td>
              <td>{row.quantity}</td>
              <td>{row.discount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default OrderDetails;
// export default createFragmentContainer(
//   OrderDetails,
//   graphql`
//     fragment OrderDetails_details on OrderDetails @relay(plural: true) {
//       productID
//       unitPrice
//       quantity
//       discount
//       product {
//         name
//       }
//     }
//   `
// );
