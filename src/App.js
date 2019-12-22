import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './users/pages/Users'
import Alerts from './alerts/pages/Alerts'
import NewAlert from './alerts/pages/NewAlert'
import MainNavigation from './shared/components/navigation/MainNavigation'
import Footer from './shared/components/Footer'

const App = () => {
  return (
    <Router>
    <MainNavigation />
    <main className="center">
      <Switch>
        <Route path="/" exact>
          <NewAlert />
        </Route>
        <Route path="/:userId/alerts" exact>
          <Alerts />
        </Route>
        <Route path="/alerts/new" exact>
          <NewAlert />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
    <Footer />
  </Router>
  )
}

export default App;
