export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface Query {
  /** A simple type for getting started! */
  hello?: Maybe<string>;

  user?: Maybe<User>;
}

export interface User {
  name: string;

  articles: Article[];

  friends?: Maybe<User>;
}

export interface Article {
  /** `aaa` | `ok` \\\ */
  title: string;

  a?: Maybe<number>;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: number;

  err?: Maybe<string>;
}

import { GraphQLResolveInfo } from "graphql";

import { GraphQLContext } from "../schema/context";

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

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
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
    /** A simple type for getting started! */
    hello?: HelloResolver<Maybe<string>, TypeParent, Context>;

    user?: UserResolver<Maybe<User>, TypeParent, Context>;
  }

  export type HelloResolver<
    R = Maybe<string>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = Maybe<User>,
    Parent = {},
    Context = GraphQLContext
  > = Resolver<R, Parent, Context, UserArgs>;
  export interface UserArgs {
    id: number;

    err?: Maybe<string>;
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = User> {
    name?: NameResolver<string, TypeParent, Context>;

    articles?: ArticlesResolver<Article[], TypeParent, Context>;

    friends?: FriendsResolver<Maybe<User>, TypeParent, Context>;
  }

  export type NameResolver<
    R = string,
    Parent = User,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type ArticlesResolver<
    R = Article[],
    Parent = User,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type FriendsResolver<
    R = Maybe<User>,
    Parent = User,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
}

export namespace ArticleResolvers {
  export interface Resolvers<Context = GraphQLContext, TypeParent = Article> {
    /** `aaa` | `ok` \\\ */
    title?: TitleResolver<string, TypeParent, Context>;

    a?: AResolver<Maybe<number>, TypeParent, Context>;
  }

  export type TitleResolver<
    R = string,
    Parent = Article,
    Context = GraphQLContext
  > = Resolver<R, Parent, Context>;
  export type AResolver<
    R = Maybe<number>,
    Parent = Article,
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

export interface IResolvers {
  Query?: QueryResolvers.Resolvers;
  User?: UserResolvers.Resolvers;
  Article?: ArticleResolvers.Resolvers;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
export const typeDefs = `
type Article {
  # \`aaa\` | \`ok\` \\\\\\
  title: String!
  a: Int
}

type Query {
  # A simple type for getting started!
  hello: String
  user(id: Int!, err: String): User
}

type User {
  name: String!
  articles: [Article!]!
  friends: User
}
`;
