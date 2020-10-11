import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/singup" component={SingUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
