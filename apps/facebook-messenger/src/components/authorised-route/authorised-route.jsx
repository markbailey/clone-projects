import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const AuthorisedRoute = ({ render, component, exact, path, isGuest }) => {
  const location = useLocation();
  const redirect = !['/sign-in', '/sign-up'].includes(location.pathname);

  return isGuest ? (
    redirect ? (
      <Redirect to="/sign-in" />
    ) : null
  ) : (
    <Route exact={exact} path={path} component={component} render={render} />
  );
};

export default AuthorisedRoute;
