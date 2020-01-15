import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './users/pages/Users'
import Alerts from './alerts/pages/Alerts'
import NewAlert from './alerts/pages/NewAlert'
import UpdateAlert from './alerts/pages/UpdateAlert'
import MainNavigation from './shared/components/navigation/MainNavigation'
import Footer from './shared/components/Footer'
import Auth from './alerts/pages/Auth'

const App = () => {
  return (
    <Router>
    <MainNavigation />
    <main className="">
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
        <Route path="/alerts/:alertId">
          <UpdateAlert />
        </Route>
        <Route path="/auth">
          <Auth></Auth>
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
    <Footer />
  </Router>
  )
}

export default App;
