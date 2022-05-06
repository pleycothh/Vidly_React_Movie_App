import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NotFound from './components/notFound'
import NavBar from './components/navBar'
import Customers from './components/customers'
import Rentals from './components/rentals'
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <NavBar/>
      <main className="container">
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route to="/not-found" component={NotFound}/>
          <Redirect path="/" exact to="/rentals" />
          <Redirect to="/not-found" />

        </Switch>
      </main>
      </React.Fragment>
    )
  }
}

export default App
