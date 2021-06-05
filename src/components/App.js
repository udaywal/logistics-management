import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css"
import Header from './Header.js'
import Home from './Home';
import Vehicle from './Vehicle';
import Item from './Item';
import Customer from './Customer';
import Order from './Order';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__body">
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/vehicles" component={Vehicle} />
              <Route path="/items" component={Item} />
              <Route path="/customers" component={Customer} />
              <Route path="/orders" component={Order} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;