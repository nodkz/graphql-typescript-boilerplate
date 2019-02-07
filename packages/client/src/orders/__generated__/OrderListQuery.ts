/* tslint:disable */
// This file was automatically generated and should not be edited.

import { OrderFilterInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: OrderListQuery
// ====================================================

export interface OrderListQuery_orderPagination_items_customer {
  __typename: "Customer";
  companyName: string | null;
}

export interface OrderListQuery_orderPagination_items_employee {
  __typename: "Employee";
  firstName: string | null;
  lastName: string | null;
  employeeID: number;
}

export interface OrderListQuery_orderPagination_items {
  __typename: "Order";
  _id: number;
  orderID: number | null;
  customer: OrderListQuery_orderPagination_items_customer | null;
  employeeID: number | null;
  employee: OrderListQuery_orderPagination_items_employee | null;
  orderDate: any | null;
  freight: number | null;
}

export interface OrderListQuery_orderPagination_pageInfo {
  __typename: "PaginationInfo";
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
}

export interface OrderListQuery_orderPagination {
  __typename: "OrderPagination";
  items: OrderListQuery_orderPagination_items[];
  pageInfo: OrderListQuery_orderPagination_pageInfo;
}

export interface OrderListQuery {
  orderPagination: OrderListQuery_orderPagination;
}

export interface OrderListQueryVariables {
  page: number;
  perPage: number;
  filter?: OrderFilterInput | null;
}
