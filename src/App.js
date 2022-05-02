import React, { Component } from 'react'
import Movies from './components/movies'
import { Route, Switch, Redirect } from 'react-router-dom'
import NotFound from './components/notFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <main className="container">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/" exact component={Movies} />
          {/* order from most spesific one to most generaic one */}
          <Redirect to="/not-found" />
        </Switch>
      </main>
    )
  }
}

export default App
