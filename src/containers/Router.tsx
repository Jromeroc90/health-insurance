import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Data from './Data';
import Plans from './Plans';
import Thanks from './Thanks';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/datos' component={Data} />
      <Route exact path='/planes' component={Plans} />
      <Route exact path='/gracias' component={Thanks} />
    </Switch>
  </BrowserRouter>
);

export default Router;