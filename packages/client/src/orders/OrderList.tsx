import React, { Component } from 'react';
// import { createPaginationContainer, graphql } from 'react-relay';
import { Well } from 'react-bootstrap';
import OrderListItem from './OrderListItem';
import OrderListHeaders from './OrderListHeaders';
import gql from 'graphql-tag';
import { OrderListFragment } from './__generated__/OrderListFragment';
import Pagination from '../components/Pagination';

interface Props {
  orderPagination: OrderListFragment;
}

class OrderList extends React.Component<Props> {
  public static fragment = gql`
    fragment OrderListFragment on OrderPagination {
      items {
        ...OrderListItemFragment
      }
      pageInfo {
        totalItems
        ...PaginationFragment
      }
    }
    ${OrderListItem.fragment}
    ${Pagination.fragment}
  `;

  public render() {
    const { orderPagination } = this.props;

    if (!orderPagination || orderPagination.items.length === 0) {
      return <div>empty order list</div>;
    }

    return (
      <div>
        <Pagination pageInfo={orderPagination.pageInfo} />

        <OrderListHeaders count={orderPagination.pageInfo.totalItems} />

        {orderPagination.items.map(item => {
          return (
            <div key={item._id}>
              <OrderListItem order={item} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default OrderList;
