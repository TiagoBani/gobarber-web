import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/singup" component={SingUp} />
    </Switch>
  );
};

export default Routes;
