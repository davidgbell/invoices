import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Home } from './pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>Login</Route>
        <Route path='/register'>Register</Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
