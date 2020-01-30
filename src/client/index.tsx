import * as React from 'react'
import OfferContainer from './containers/Offers.container'
import JobContainer from './containers/Jobs.container'
import { Route, Redirect } from 'react-router-dom'
import { Header, Footer } from './components'
import { hot } from 'react-hot-loader'

export const App = hot(module)(() => (
  <div>
    <Header />
    <Redirect from="/" exact to="/offers" />
    <Route default path="/offers" component={OfferContainer} />
    <Route path="/jobs" component={JobContainer} />
    <Footer />
  </div>
))
