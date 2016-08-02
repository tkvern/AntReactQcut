import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import NotFound from '../components/Shared/NotFound';
import ConsoleIndex from '../components/Console/ConsoleIndex';
import OrderIndex from '../components/Order/OrderIndex';
import BarberIndex from '../components/Barber/BarberIndex';
import AuthLogin from '../components/Auth/AuthLogin';
import AuthSignUp from '../components/Auth/AuthSignUp';
// import from '../components/Auth/AuthSetPassword.jsx';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={ConsoleIndex} />
    <Route path="/order" component={OrderIndex} />
    <Route path="/login" component={AuthLogin} />
    <Route path="/signup" component={AuthSignUp} />
    <Route path="/setpassword" component={ConsoleIndex} />
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
