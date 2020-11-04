import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeView from '../views/home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={HomeView} />
    </Switch>
  );
}
