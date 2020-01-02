import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router, Link } from "@reach/router";
import { useAuth0 } from "./react-auth0-spa";
import NavBar from "./components/NavBar";
import Welcome from "./views/Welcome/";
import Home from "./views/Home/";
import SetLocation from "./views/SetLocation/";

export default function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <CssBaseline />
      <NavBar />

      {isAuthenticated ? (
        <Router>
          <Home path="/" />
          <SetLocation path="/set-location" />
        </Router>
      ) : (
        <Welcome />
      )}
    </div>
  );
}
