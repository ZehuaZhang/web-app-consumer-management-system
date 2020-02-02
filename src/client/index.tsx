import * as React from 'react'
import * as UserContainer from './containers/Users.container'
import { Route, Redirect } from 'react-router-dom'
import { Header, Footer } from './components'
import { hot } from 'react-hot-loader'

export const App = hot(module)(() => (
  <div>
    <Header />
    <Redirect from="/" exact to="/users" />
    <Route default path="/users" component={UserContainer} />
    <Footer />
  </div>
))
