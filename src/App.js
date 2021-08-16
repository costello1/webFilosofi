import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Company } from './Company';
import Login from "./Login";
import User from "./User";
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/Auth';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/company/:id" component={Company} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/user' component={User} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};