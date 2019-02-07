/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrderListItemFragment
// ====================================================

export interface OrderListItemFragment_customer {
  __typename: "Customer";
  companyName: string | null;
}

export interface OrderListItemFragment_employee {
  __typename: "Employee";
  firstName: string | null;
  lastName: string | null;
  employeeID: number;
}

export interface OrderListItemFragment {
  __typename: "Order";
  _id: number;
  orderID: number | null;
  customer: OrderListItemFragment_customer | null;
  employeeID: number | null;
  employee: OrderListItemFragment_employee | null;
  orderDate: any | null;
  freight: number | null;
}
