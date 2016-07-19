import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import NotFound from '../components/Shared/NotFound';
import ConsoleIndex from '../components/Console/ConsoleIndex';
import OrderIndex from '../components/Order/OrderIndex';
import BarberIndex from '../components/Barber/BarberIndex';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={ConsoleIndex} />
    <Route path="/order" component={OrderIndex} />
    
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
