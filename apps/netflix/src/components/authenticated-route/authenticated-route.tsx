import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import IRouteProps from '../../interfaces/IRouteProps';

export default function AuthenticatedRoute(props: IRouteProps): React.ReactElement {
  const { path, component: Component, isAuthenticated } = props;
  return <Route path={path} component={(props: any) => isAuthenticated ? <Component {...props} /> : <Redirect to="/sign-in" />} />;
}

