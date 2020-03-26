import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './users/pages/Users'
import Alerts from './alerts/pages/Alerts'
import NewAlert from './alerts/pages/NewAlert'
import UpdateAlert from './alerts/pages/UpdateAlert'
import MainNavigation from './shared/components/navigation/MainNavigation'
import Footer from './shared/components/Footer'
import Auth from './alerts/pages/Auth'
import { AuthContext } from './shared/context/auth-context'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)
  const [userToken, setUserToken] = useState(false)

  const login = useCallback((uid, utoken) => {
    setIsLoggedIn(true)
    setUserId(uid)
    setUserToken(utoken)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
    setUserToken(null)
  }, [])

  let routes

  if (isLoggedIn) {
    routes = (
    <Switch>
      <Route path="/" exact>
        <NewAlert />
      </Route>
      <Route path="/alerts/new" exact>
        <NewAlert />
      </Route>
      <Route path="/:userId/alerts" exact>
        <Alerts />
      </Route>
      <Route path="/alerts/:alertId">
        <UpdateAlert />
      </Route>
      <Redirect to="/" />
    </Switch>)
  } else {
    routes = (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/alerts" exact>
        <Alerts />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>)
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, userId, userToken, login, logout}}>
      <Router>
      <MainNavigation />
      <main className="">
        {routes}
      </main>
      <Footer />
    </Router>
  </AuthContext.Provider>
  )
}

export default App;
