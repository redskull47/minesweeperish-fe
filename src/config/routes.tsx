import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BASE_PATH } from './paths';

import MinesweeperView from 'views/minesweeperView/minesweeperView';

const routes = (
  <Switch>
    <Route exact path={BASE_PATH} component={MinesweeperView} />
  </Switch>
);

export default routes;
