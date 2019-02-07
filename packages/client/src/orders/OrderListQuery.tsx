import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import OrderList from './OrderList';
import { OrderListQuery as Q, OrderListQueryVariables as V } from './__generated__/OrderListQuery';
import Loading from '../components/Loading';
import BrokenPage from '../components/BrokenPage';

class TypedQuery extends Query<Q, V> {}

interface Props {
  page: number;
  perPage: number;
}

export default function OrderListQuery({ page = 1, perPage = 20 }) {
  return (
    <TypedQuery
      query={gql`
        query OrderListQuery($page: Int!, $perPage: Int!, $filter: OrderFilterInput) {
          orderPagination(page: $page, perPage: $perPage, filter: $filter) {
            ...OrderListFragment
          }
        }
        ${OrderList.fragment}
      `}
      variables={{
        page,
        perPage,
      }}
    >
      {({ data, loading, error }) => {
        if (error) return <BrokenPage message={error.message} />;
        if (loading || !data) return <Loading />;

        return <OrderList orderPagination={data.orderPagination} />;
      }}
    </TypedQuery>
  );
}
