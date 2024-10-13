// File: src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Artists from './components/Artists';
import Requests from './components/Requests';
import Calendar from './components/Calendar';
import AddEvent from './components/AddEvent';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Header} />
      </Switch>
    </Router>
  );
}

export default App;