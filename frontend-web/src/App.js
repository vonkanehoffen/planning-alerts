import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router, Link } from "@reach/router";
import { useAuth0 } from "./react-auth0-spa";
import NavBar from "./components/NavBar";
import PlanningApps from "./PlanningApps";

export default function App() {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading (app)...</div>;
  }

  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      {/*<Router>*/}
      ere
      {/*</Router>*/}
      {isAuthenticated && <PlanningApps />}
    </div>
  );
}
