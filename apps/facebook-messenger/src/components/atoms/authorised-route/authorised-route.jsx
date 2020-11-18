import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const AuthorisedRoute = ({
  children,
  render,
  component,
  exact,
  path,
  isGuest,
}) => {
  const location = useLocation();
  const redirect =
    ['/sign-in', '/sign-up', '/forgot-password'].findIndex(path =>
      location.pathname.startsWith(path),
    ) === -1;

  return isGuest ? (
    redirect ? (
      <Redirect to="/sign-in" />
    ) : null
  ) : (
    <Route exact={exact} path={path} component={component} render={render}>
      {children}
    </Route>
  );
};

export default AuthorisedRoute;
