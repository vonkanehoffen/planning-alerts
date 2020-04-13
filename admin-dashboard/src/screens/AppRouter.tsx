import React from "react";
import { useAuth0 } from '../react-auth0-spa'
import { NoAuthWelcome } from './NoAuthWelcome'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Home } from './Home'

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  if(!isAuthenticated) return <NoAuthWelcome/>

  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  )
};
