import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';
import OrderListQuery from './OrderListQuery';
import qs from 'qs';

interface Props extends RouteComponentProps {
  // Add your regular properties here
}

export default function OrderRoutes({ match }: Props) {
  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        exact
        render={({ location }) => {
          console.log(location);
          const query = qs.parse(location.search, { ignoreQueryPrefix: true });
          console.log(query);
          return (
            <OrderListQuery
              page={Number.parseInt(query.page, 10) || 1}
              perPage={Number.parseInt(query.perPage, 10) || 20}
            />
          );
        }}
      />
      <Route path={`${match.url}/:id`} render={() => <div>Order page by id</div>} />
    </Switch>
  );
}
