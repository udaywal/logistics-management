import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css"
import Header from './Header.js'
import HomePage from '../pages/HomePage';
import Vehicle from './Vehicle';
import CustomerPage from '../pages/CustomerPage';
import OrderPage from '../pages/OrderPage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/vehicle" component={Vehicle} />
            <Route path="/customer" component={CustomerPage} />
            <Route path="/order" component={OrderPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;