/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderListFragment
// ====================================================

export interface OrderListFragment_items_customer {
  __typename: "Customer";
  companyName: string | null;
}

export interface OrderListFragment_items_employee {
  __typename: "Employee";
  firstName: string | null;
  lastName: string | null;
  employeeID: number;
}

export interface OrderListFragment_items {
  __typename: "Order";
  _id: number;
  orderID: number | null;
  customer: OrderListFragment_items_customer | null;
  employeeID: number | null;
  employee: OrderListFragment_items_employee | null;
  orderDate: any | null;
  freight: number | null;
}

export interface OrderListFragment_pageInfo {
  __typename: "PaginationInfo";
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
}

export interface OrderListFragment {
  __typename: "OrderPagination";
  items: OrderListFragment_items[];
  pageInfo: OrderListFragment_pageInfo;
}
