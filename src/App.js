import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Movies from './components/movies'
import NotFound from './components/notFound'
import NavBar from './components/navBar'
import Customers from '.components/customers'
import Rentals from './components/rentals'
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <NavBar/>
      <main className="container">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Redirect to="/not-found" component={NotFound}/>
          <Route path="/" exact component={Movies} />
        </Switch>
      </main>
      </React.Fragment>
    )
  }
}

export default App
