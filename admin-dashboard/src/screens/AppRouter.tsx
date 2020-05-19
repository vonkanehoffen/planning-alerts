import React from "react";
import { useAuth0 } from '../react-auth0-spa'
import { NoAuthWelcome } from './NoAuthWelcome'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Councils } from './Councils'
import { ScrapeLog } from './ScrapeLog'

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  if(!isAuthenticated) return <NoAuthWelcome/>

  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/">
          <ScrapeLog />
        </Route>
        <Route path="/councils">
          <Councils/>
        </Route>
      </Switch>
    </Router>
  )
};
