export type Maybe<T> = T | null;

export interface CustomerFilterInput {
  companyName?: Maybe<string>;

  address?: Maybe<AddressInput>;
}

export interface AddressInput {
  street?: Maybe<string>;

  city?: Maybe<string>;

  region?: Maybe<string>;

  postalCode?: Maybe<string>;

  country?: Maybe<string>;

  phone?: Maybe<string>;
}

export interface EmployeeFilterInput {
  title?: Maybe<string>;

  lastName?: Maybe<string>;

  reportsTo?: Maybe<number>;

  address?: Maybe<AddressInput>;
}

export interface OrderFilterInput {
  orderID?: Maybe<number>;

  customerID?: Maybe<string>;

  employeeID?: Maybe<number>;

  orderDate?: Maybe<Date>;

  requiredDate?: Maybe<Date>;

  shippedDate?: Maybe<Date>;

  shipVia?: Maybe<number>;

  freight?: Maybe<number>;

  shipName?: Maybe<string>;

  shipAddress?: Maybe<AddressInput>;
}

export interface ProductFilterInput {
  productID?: Maybe<number>;

  productName?: Maybe<string>;

  supplierID?: Maybe<number>;

  categoryID?: Maybe<number>;

  quantityPerUnit?: Maybe<string>;

  unitPrice?: Maybe<number>;

  unitsInStock?: Maybe<number>;

  unitsOnOrder?: Maybe<number>;

  reorderLevel?: Maybe<number>;

  discontinued?: Maybe<boolean>;
}

export interface CustomerInput {
  customerID: string;

  companyName: string;

  contactName?: Maybe<string>;

  contactTitle?: Maybe<string>;

  address?: Maybe<AddressInput>;
}

export type Date = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  customer?: Maybe<Customer>;

  customers: Array<Maybe<Customer>>;

  employee?: Maybe<Employee>;

  employees: Array<Maybe<Employee>>;

  me?: Maybe<Me>;

  order?: Maybe<Order>;

  orders: Order[];

  orderPagination: OrderPagination;

  product?: Maybe<Product>;

  products: Array<Maybe<Product>>;
  /** A simple type for getting started! */
  hello?: Maybe<string>;
}

export interface Customer {
  _id: string;

  customerID: string;

  companyName?: Maybe<string>;

  contactName?: Maybe<string>;

  contactTitle?: Maybe<string>;

  address?: Maybe<Address>;
}

export interface Address {
  street?: Maybe<string>;

  city?: Maybe<string>;

  region?: Maybe<string>;

  postalCode?: Maybe<string>;

  country?: Maybe<string>;

  phone?: Maybe<string>;
}

export interface Employee {
  _id: string;

  employeeID: number;

  lastName?: Maybe<string>;

  firstName?: Maybe<string>;

  title?: Maybe<string>;

  titleOfCourtesy?: Maybe<string>;

  birthDate?: Maybe<Date>;

  hireDate?: Maybe<Date>;

  address?: Maybe<Address>;

  phone?: Maybe<string>;

  notes?: Maybe<string>;

  reportsTo?: Maybe<Employee>;

  reportsID?: Maybe<number>;

  subordinates: Array<Maybe<Employee>>;

  territoryID: Array<Maybe<number>>;
}

export interface Me {
  user?: Maybe<User>;

  userData?: Maybe<string>;

  adminData?: Maybe<string>;
}

export interface User {
  id: number;

  name?: Maybe<string>;

  login?: Maybe<string>;

  roles: Array<Maybe<string>>;
}

export interface Order {
  _id: number;

  orderID?: Maybe<number>;

  customerID?: Maybe<string>;

  customer?: Maybe<Customer>;

  employeeID?: Maybe<number>;

  employee?: Maybe<Employee>;

  orderDate?: Maybe<Date>;

  requiredDate?: Maybe<Date>;

  shippedDate?: Maybe<Date>;

  shipVia?: Maybe<number>;

  freight?: Maybe<number>;

  shipName?: Maybe<string>;

  shipAddress?: Maybe<Address>;

  details: Array<Maybe<OrderDetails>>;
}

export interface OrderDetails {
  productID?: Maybe<number>;

  product?: Maybe<Product>;

  unitPrice?: Maybe<number>;

  quantity?: Maybe<number>;

  discount?: Maybe<number>;
}

export interface Product {
  _id: string;

  productID: number;

  name?: Maybe<string>;

  supplierID?: Maybe<number>;

  categoryID?: Maybe<number>;

  quantityPerUnit?: Maybe<string>;

  unitPrice?: Maybe<number>;

  unitsInStock?: Maybe<number>;

  unitsOnOrder?: Maybe<number>;

  reorderLevel?: Maybe<number>;

  discontinued?: Maybe<boolean>;
}

export interface OrderPagination {
  items: Order[];

  pageInfo: PaginationInfo;
}

export interface PaginationInfo {
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Current page number */
  page: number;
  /** Number of items per page */
  perPage: number;
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean;
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean;
}

export interface Mutation {
  login?: Maybe<LoginPayload>;

  logout?: Maybe<boolean>;

  customer?: Maybe<CustomerMutations>;

  time?: Maybe<string>;
}

export interface LoginPayload {
  token?: Maybe<string>;

  ok: boolean;

  query?: Maybe<Query>;
}

export interface CustomerMutations {
  create?: Maybe<CustomerCreatePayload>;
}

export interface CustomerCreatePayload {
  record?: Maybe<Customer>;
}

// ====================================================
// Arguments
// ====================================================

export interface CustomerQueryArgs {
  id: string;
}
export interface CustomersQueryArgs {
  filter?: Maybe<CustomerFilterInput>;

  limit: number;

  offset?: Maybe<number>;
}
export interface EmployeeQueryArgs {
  id: string;
}
export interface EmployeesQueryArgs {
  filter?: Maybe<EmployeeFilterInput>;

  limit: number;

  offset?: Maybe<number>;
}
export interface OrderQueryArgs {
  id: string;
}
export interface OrdersQueryArgs {
  filter?: Maybe<OrderFilterInput>;

  limit: number;

  offset?: Maybe<number>;
}
export interface OrderPaginationQueryArgs {
  filter?: Maybe<OrderFilterInput>;

  page: number;

  perPage: number;
}
export interface ProductQueryArgs {
  id: string;
}
export interface ProductsQueryArgs {
  filter?: Maybe<ProductFilterInput>;

  limit: number;

  offset?: Maybe<number>;
}
export interface LoginMutationArgs {
  login: string;

  password: string;
}
export interface CreateCustomerMutationsArgs {
  input: CustomerInput;
}

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

import { GraphQLContext } from '../context';

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<Result, Parent = {}, Context = {}, Args = {}> =
  | ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = {}> {
    customer?: CustomerResolver<Maybe<Customer>, TypeParent, Context>;

    customers?: CustomersResolver<Array<Maybe<Customer>>, TypeParent, Context>;

    employee?: EmployeeResolver<Maybe<Employee>, TypeParent, Context>;

    employees?: EmployeesResolver<Array<Maybe<Employee>>, TypeParent, Context>;

    me?: MeResolver<Maybe<Me>, TypeParent, Context>;

    order?: OrderResolver<Maybe<Order>, TypeParent, Context>;

    orders?: OrdersResolver<Order[], TypeParent, Context>;

    orderPagination?: OrderPaginationResolver<OrderPagination, TypeParent, Context>;

    product?: ProductResolver<Maybe<Product>, TypeParent, Context>;

    products?: ProductsResolver<Array<Maybe<Product>>, TypeParent, Context>;
    /** A simple type for getting started! */
    hello?: HelloResolver<Maybe<string>, TypeParent, Context>;
  }

  export type CustomerResolver<
    R = Maybe<Customer>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, CustomerArgs>;
  export interface CustomerArgs {
    id: string;
  }

  export type CustomersResolver<
    R = Array<Maybe<Customer>>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, CustomersArgs>;
  export interface CustomersArgs {
    filter?: Maybe<CustomerFilterInput>;

    limit: number;

    offset?: Maybe<number>;
  }

  export type EmployeeResolver<
    R = Maybe<Employee>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, EmployeeArgs>;
  export interface EmployeeArgs {
    id: string;
  }

  export type EmployeesResolver<
    R = Array<Maybe<Employee>>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, EmployeesArgs>;
  export interface EmployeesArgs {
    filter?: Maybe<EmployeeFilterInput>;

    limit: number;

    offset?: Maybe<number>;
  }

  export type MeResolver<R = Maybe<Me>, Parent = {}, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OrderResolver<R = Maybe<Order>, Parent = {}, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context,
    OrderArgs
  >;
  export interface OrderArgs {
    id: string;
  }

  export type OrdersResolver<R = Order[], Parent = {}, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context,
    OrdersArgs
  >;
  export interface OrdersArgs {
    filter?: Maybe<OrderFilterInput>;

    limit: number;

    offset?: Maybe<number>;
  }

  export type OrderPaginationResolver<
    R = OrderPagination,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, OrderPaginationArgs>;
  export interface OrderPaginationArgs {
    filter?: Maybe<OrderFilterInput>;

    page: number;

    perPage: number;
  }

  export type ProductResolver<R = Maybe<Product>, Parent = {}, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context,
    ProductArgs
  >;
  export interface ProductArgs {
    id: string;
  }

  export type ProductsResolver<
    R = Array<Maybe<Product>>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, ProductsArgs>;
  export interface ProductsArgs {
    filter?: Maybe<ProductFilterInput>;

    limit: number;

    offset?: Maybe<number>;
  }

  export type HelloResolver<R = Maybe<string>, Parent = {}, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace CustomerResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = Customer> {
    _id?: _IdResolver<string, TypeParent, Context>;

    customerID?: CustomerIdResolver<string, TypeParent, Context>;

    companyName?: CompanyNameResolver<Maybe<string>, TypeParent, Context>;

    contactName?: ContactNameResolver<Maybe<string>, TypeParent, Context>;

    contactTitle?: ContactTitleResolver<Maybe<string>, TypeParent, Context>;

    address?: AddressResolver<Maybe<Address>, TypeParent, Context>;
  }

  export type _IdResolver<R = string, Parent = Customer, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CustomerIdResolver<
    R = string,
    Parent = Customer,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CompanyNameResolver<
    R = Maybe<string>,
    Parent = Customer,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ContactNameResolver<
    R = Maybe<string>,
    Parent = Customer,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ContactTitleResolver<
    R = Maybe<string>,
    Parent = Customer,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type AddressResolver<
    R = Maybe<Address>,
    Parent = Customer,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace AddressResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = Address> {
    street?: StreetResolver<Maybe<string>, TypeParent, Context>;

    city?: CityResolver<Maybe<string>, TypeParent, Context>;

    region?: RegionResolver<Maybe<string>, TypeParent, Context>;

    postalCode?: PostalCodeResolver<Maybe<string>, TypeParent, Context>;

    country?: CountryResolver<Maybe<string>, TypeParent, Context>;

    phone?: PhoneResolver<Maybe<string>, TypeParent, Context>;
  }

  export type StreetResolver<
    R = Maybe<string>,
    Parent = Address,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CityResolver<
    R = Maybe<string>,
    Parent = Address,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type RegionResolver<
    R = Maybe<string>,
    Parent = Address,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type PostalCodeResolver<
    R = Maybe<string>,
    Parent = Address,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CountryResolver<
    R = Maybe<string>,
    Parent = Address,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type PhoneResolver<
    R = Maybe<string>,
    Parent = Address,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace EmployeeResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = Employee> {
    _id?: _IdResolver<string, TypeParent, Context>;

    employeeID?: EmployeeIdResolver<number, TypeParent, Context>;

    lastName?: LastNameResolver<Maybe<string>, TypeParent, Context>;

    firstName?: FirstNameResolver<Maybe<string>, TypeParent, Context>;

    title?: TitleResolver<Maybe<string>, TypeParent, Context>;

    titleOfCourtesy?: TitleOfCourtesyResolver<Maybe<string>, TypeParent, Context>;

    birthDate?: BirthDateResolver<Maybe<Date>, TypeParent, Context>;

    hireDate?: HireDateResolver<Maybe<Date>, TypeParent, Context>;

    address?: AddressResolver<Maybe<Address>, TypeParent, Context>;

    phone?: PhoneResolver<Maybe<string>, TypeParent, Context>;

    notes?: NotesResolver<Maybe<string>, TypeParent, Context>;

    reportsTo?: ReportsToResolver<Maybe<Employee>, TypeParent, Context>;

    reportsID?: ReportsIdResolver<Maybe<number>, TypeParent, Context>;

    subordinates?: SubordinatesResolver<Array<Maybe<Employee>>, TypeParent, Context>;

    territoryID?: TerritoryIdResolver<Array<Maybe<number>>, TypeParent, Context>;
  }

  export type _IdResolver<R = string, Parent = Employee, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type EmployeeIdResolver<
    R = number,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = Maybe<string>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = Maybe<string>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type TitleResolver<
    R = Maybe<string>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type TitleOfCourtesyResolver<
    R = Maybe<string>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type BirthDateResolver<
    R = Maybe<Date>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type HireDateResolver<
    R = Maybe<Date>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type AddressResolver<
    R = Maybe<Address>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type PhoneResolver<
    R = Maybe<string>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type NotesResolver<
    R = Maybe<string>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ReportsToResolver<
    R = Maybe<Employee>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ReportsIdResolver<
    R = Maybe<number>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type SubordinatesResolver<
    R = Array<Maybe<Employee>>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type TerritoryIdResolver<
    R = Array<Maybe<number>>,
    Parent = Employee,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace MeResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = Me> {
    user?: UserResolver<Maybe<User>, TypeParent, Context>;

    userData?: UserDataResolver<Maybe<string>, TypeParent, Context>;

    adminData?: AdminDataResolver<Maybe<string>, TypeParent, Context>;
  }

  export type UserResolver<R = Maybe<User>, Parent = Me, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UserDataResolver<R = Maybe<string>, Parent = Me, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AdminDataResolver<
    R = Maybe<string>,
    Parent = Me,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = User> {
    id?: IdResolver<number, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    login?: LoginResolver<Maybe<string>, TypeParent, Context>;

    roles?: RolesResolver<Array<Maybe<string>>, TypeParent, Context>;
  }

  export type IdResolver<R = number, Parent = User, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = Maybe<string>, Parent = User, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type LoginResolver<R = Maybe<string>, Parent = User, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type RolesResolver<
    R = Array<Maybe<string>>,
    Parent = User,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace OrderResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = Order> {
    _id?: _IdResolver<number, TypeParent, Context>;

    orderID?: OrderIdResolver<Maybe<number>, TypeParent, Context>;

    customerID?: CustomerIdResolver<Maybe<string>, TypeParent, Context>;

    customer?: CustomerResolver<Maybe<Customer>, TypeParent, Context>;

    employeeID?: EmployeeIdResolver<Maybe<number>, TypeParent, Context>;

    employee?: EmployeeResolver<Maybe<Employee>, TypeParent, Context>;

    orderDate?: OrderDateResolver<Maybe<Date>, TypeParent, Context>;

    requiredDate?: RequiredDateResolver<Maybe<Date>, TypeParent, Context>;

    shippedDate?: ShippedDateResolver<Maybe<Date>, TypeParent, Context>;

    shipVia?: ShipViaResolver<Maybe<number>, TypeParent, Context>;

    freight?: FreightResolver<Maybe<number>, TypeParent, Context>;

    shipName?: ShipNameResolver<Maybe<string>, TypeParent, Context>;

    shipAddress?: ShipAddressResolver<Maybe<Address>, TypeParent, Context>;

    details?: DetailsResolver<Array<Maybe<OrderDetails>>, TypeParent, Context>;
  }

  export type _IdResolver<R = number, Parent = Order, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OrderIdResolver<
    R = Maybe<number>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CustomerIdResolver<
    R = Maybe<string>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CustomerResolver<
    R = Maybe<Customer>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type EmployeeIdResolver<
    R = Maybe<number>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type EmployeeResolver<
    R = Maybe<Employee>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type OrderDateResolver<
    R = Maybe<Date>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type RequiredDateResolver<
    R = Maybe<Date>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ShippedDateResolver<
    R = Maybe<Date>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ShipViaResolver<
    R = Maybe<number>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type FreightResolver<
    R = Maybe<number>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ShipNameResolver<
    R = Maybe<string>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ShipAddressResolver<
    R = Maybe<Address>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type DetailsResolver<
    R = Array<Maybe<OrderDetails>>,
    Parent = Order,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace OrderDetailsResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = OrderDetails> {
    productID?: ProductIdResolver<Maybe<number>, TypeParent, Context>;

    product?: ProductResolver<Maybe<Product>, TypeParent, Context>;

    unitPrice?: UnitPriceResolver<Maybe<number>, TypeParent, Context>;

    quantity?: QuantityResolver<Maybe<number>, TypeParent, Context>;

    discount?: DiscountResolver<Maybe<number>, TypeParent, Context>;
  }

  export type ProductIdResolver<
    R = Maybe<number>,
    Parent = OrderDetails,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ProductResolver<
    R = Maybe<Product>,
    Parent = OrderDetails,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UnitPriceResolver<
    R = Maybe<number>,
    Parent = OrderDetails,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type QuantityResolver<
    R = Maybe<number>,
    Parent = OrderDetails,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type DiscountResolver<
    R = Maybe<number>,
    Parent = OrderDetails,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace ProductResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = Product> {
    _id?: _IdResolver<string, TypeParent, Context>;

    productID?: ProductIdResolver<number, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    supplierID?: SupplierIdResolver<Maybe<number>, TypeParent, Context>;

    categoryID?: CategoryIdResolver<Maybe<number>, TypeParent, Context>;

    quantityPerUnit?: QuantityPerUnitResolver<Maybe<string>, TypeParent, Context>;

    unitPrice?: UnitPriceResolver<Maybe<number>, TypeParent, Context>;

    unitsInStock?: UnitsInStockResolver<Maybe<number>, TypeParent, Context>;

    unitsOnOrder?: UnitsOnOrderResolver<Maybe<number>, TypeParent, Context>;

    reorderLevel?: ReorderLevelResolver<Maybe<number>, TypeParent, Context>;

    discontinued?: DiscontinuedResolver<Maybe<boolean>, TypeParent, Context>;
  }

  export type _IdResolver<R = string, Parent = Product, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ProductIdResolver<R = number, Parent = Product, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type SupplierIdResolver<
    R = Maybe<number>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type CategoryIdResolver<
    R = Maybe<number>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type QuantityPerUnitResolver<
    R = Maybe<string>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UnitPriceResolver<
    R = Maybe<number>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UnitsInStockResolver<
    R = Maybe<number>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UnitsOnOrderResolver<
    R = Maybe<number>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ReorderLevelResolver<
    R = Maybe<number>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type DiscontinuedResolver<
    R = Maybe<boolean>,
    Parent = Product,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace OrderPaginationResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = OrderPagination> {
    items?: ItemsResolver<Order[], TypeParent, Context>;

    pageInfo?: PageInfoResolver<PaginationInfo, TypeParent, Context>;
  }

  export type ItemsResolver<
    R = Order[],
    Parent = OrderPagination,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type PageInfoResolver<
    R = PaginationInfo,
    Parent = OrderPagination,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace PaginationInfoResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = PaginationInfo> {
    /** Total number of pages */
    totalPages?: TotalPagesResolver<number, TypeParent, Context>;
    /** Total number of items */
    totalItems?: TotalItemsResolver<number, TypeParent, Context>;
    /** Current page number */
    page?: PageResolver<number, TypeParent, Context>;
    /** Number of items per page */
    perPage?: PerPageResolver<number, TypeParent, Context>;
    /** When paginating forwards, are there more items? */
    hasNextPage?: HasNextPageResolver<boolean, TypeParent, Context>;
    /** When paginating backwards, are there more items? */
    hasPreviousPage?: HasPreviousPageResolver<boolean, TypeParent, Context>;
  }

  export type TotalPagesResolver<
    R = number,
    Parent = PaginationInfo,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type TotalItemsResolver<
    R = number,
    Parent = PaginationInfo,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type PageResolver<
    R = number,
    Parent = PaginationInfo,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type PerPageResolver<
    R = number,
    Parent = PaginationInfo,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type HasNextPageResolver<
    R = boolean,
    Parent = PaginationInfo,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type HasPreviousPageResolver<
    R = boolean,
    Parent = PaginationInfo,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = {}> {
    login?: LoginResolver<Maybe<LoginPayload>, TypeParent, Context>;

    logout?: LogoutResolver<Maybe<boolean>, TypeParent, Context>;

    customer?: CustomerResolver<Maybe<CustomerMutations>, TypeParent, Context>;

    time?: TimeResolver<Maybe<string>, TypeParent, Context>;
  }

  export type LoginResolver<
    R = Maybe<LoginPayload>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    login: string;

    password: string;
  }

  export type LogoutResolver<R = Maybe<boolean>, Parent = {}, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CustomerResolver<
    R = Maybe<CustomerMutations>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type TimeResolver<R = Maybe<string>, Parent = {}, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace LoginPayloadResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = LoginPayload> {
    token?: TokenResolver<Maybe<string>, TypeParent, Context>;

    ok?: OkResolver<boolean, TypeParent, Context>;

    query?: QueryResolver<Maybe<Query>, TypeParent, Context>;
  }

  export type TokenResolver<
    R = Maybe<string>,
    Parent = LoginPayload,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type OkResolver<R = boolean, Parent = LoginPayload, Context = GraphQLContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type QueryResolver<
    R = Maybe<Query>,
    Parent = LoginPayload,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace CustomerMutationsResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = CustomerMutations> {
    create?: CreateResolver<Maybe<CustomerCreatePayload>, TypeParent, Context>;
  }

  export type CreateResolver<
    R = Maybe<CustomerCreatePayload>,
    Parent = CustomerMutations,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, CreateArgs>;
  export interface CreateArgs {
    input: CustomerInput;
  }
}

export namespace CustomerCreatePayloadResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = CustomerCreatePayload> {
    record?: RecordResolver<Maybe<Customer>, TypeParent, Context>;
  }

  export type RecordResolver<
    R = Maybe<Customer>,
    Parent = CustomerCreatePayload,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  GraphQLContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  GraphQLContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  GraphQLContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: 'Date';
}

export interface IResolvers {
  Query?: QueryResolvers.Resolvers;
  Customer?: CustomerResolvers.Resolvers;
  Address?: AddressResolvers.Resolvers;
  Employee?: EmployeeResolvers.Resolvers;
  Me?: MeResolvers.Resolvers;
  User?: UserResolvers.Resolvers;
  Order?: OrderResolvers.Resolvers;
  OrderDetails?: OrderDetailsResolvers.Resolvers;
  Product?: ProductResolvers.Resolvers;
  OrderPagination?: OrderPaginationResolvers.Resolvers;
  PaginationInfo?: PaginationInfoResolvers.Resolvers;
  Mutation?: MutationResolvers.Resolvers;
  LoginPayload?: LoginPayloadResolvers.Resolvers;
  CustomerMutations?: CustomerMutationsResolvers.Resolvers;
  CustomerCreatePayload?: CustomerCreatePayloadResolvers.Resolvers;
  Date?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
export const typeDefs = `
type Address {
  street: String
  city: String
  region: String
  postalCode: String
  country: String
  phone: String
}

input AddressInput {
  street: String
  city: String
  region: String
  postalCode: String
  country: String
  phone: String
}

type Customer {
  _id: ID!
  customerID: String!
  companyName: String
  contactName: String
  contactTitle: String
  address: Address
}

type CustomerCreatePayload {
  record: Customer
}

input CustomerFilterInput {
  companyName: String
  address: AddressInput
}

input CustomerInput {
  customerID: String!
  companyName: String!
  contactName: String
  contactTitle: String
  address: AddressInput
}

type CustomerMutations {
  create(input: CustomerInput!): CustomerCreatePayload
}

scalar Date

type Employee {
  _id: ID!
  employeeID: Int!
  lastName: String
  firstName: String
  title: String
  titleOfCourtesy: String
  birthDate: Date
  hireDate: Date
  address: Address
  phone: String
  notes: String
  reportsTo: Employee
  reportsID: Int
  subordinates: [Employee]!
  territoryID: [Int]!
}

input EmployeeFilterInput {
  title: String
  lastName: String
  reportsTo: Int
  address: AddressInput
}

type LoginPayload {
  token: String
  ok: Boolean!
  query: Query
}

type Me {
  user: User
  userData: String
  adminData: String
}

type Mutation {
  login(login: String!, password: String!): LoginPayload
  logout: Boolean
  customer: CustomerMutations
  time: String
}

type Order {
  _id: Int!
  orderID: Int
  customerID: String
  customer: Customer
  employeeID: Int
  employee: Employee
  orderDate: Date
  requiredDate: Date
  shippedDate: Date
  shipVia: Int
  freight: Float
  shipName: String
  shipAddress: Address
  details: [OrderDetails]!
}

type OrderDetails {
  productID: Int
  product: Product
  unitPrice: Float
  quantity: Int
  discount: Float
}

input OrderFilterInput {
  orderID: Int
  customerID: String
  employeeID: Int
  orderDate: Date
  requiredDate: Date
  shippedDate: Date
  shipVia: Int
  freight: Float
  shipName: String
  shipAddress: AddressInput
}

type OrderPagination {
  items: [Order!]!
  pageInfo: PaginationInfo!
}

type PaginationInfo {
  # Total number of pages
  totalPages: Int!

  # Total number of items
  totalItems: Int!

  # Current page number
  page: Int!

  # Number of items per page
  perPage: Int!

  # When paginating forwards, are there more items?
  hasNextPage: Boolean!

  # When paginating backwards, are there more items?
  hasPreviousPage: Boolean!
}

type Product {
  _id: ID!
  productID: Int!
  name: String
  supplierID: Int
  categoryID: Int
  quantityPerUnit: String
  unitPrice: Float
  unitsInStock: Int
  unitsOnOrder: Int
  reorderLevel: Int
  discontinued: Boolean
}

input ProductFilterInput {
  productID: Int
  productName: String
  supplierID: Int
  categoryID: Int
  quantityPerUnit: String
  unitPrice: Float
  unitsInStock: Int
  unitsOnOrder: Int
  reorderLevel: Int
  discontinued: Boolean
}

type Query {
  customer(id: ID!): Customer
  customers(filter: CustomerFilterInput, limit: Int! = 20, offset: Int): [Customer]!
  employee(id: ID!): Employee
  employees(filter: EmployeeFilterInput, limit: Int! = 20, offset: Int): [Employee]!
  me: Me
  order(id: ID!): Order
  orders(filter: OrderFilterInput, limit: Int! = 20, offset: Int): [Order!]!
  orderPagination(filter: OrderFilterInput, page: Int! = 1, perPage: Int! = 20): OrderPagination!
  product(id: ID!): Product
  products(filter: ProductFilterInput, limit: Int! = 20, offset: Int): [Product]!

  # A simple type for getting started!
  hello: String
}

type User {
  id: Int!
  name: String
  login: String
  roles: [String]!
}

`;
