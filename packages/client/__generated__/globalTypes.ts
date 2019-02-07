/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddressInput {
  street?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
}

export interface OrderFilterInput {
  orderID?: number | null;
  customerID?: string | null;
  employeeID?: number | null;
  orderDate?: any | null;
  requiredDate?: any | null;
  shippedDate?: any | null;
  shipVia?: number | null;
  freight?: number | null;
  shipName?: string | null;
  shipAddress?: AddressInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
