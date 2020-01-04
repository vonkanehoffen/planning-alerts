import React from "react";
import { Router, Link } from "@reach/router";
import { makeStyles } from "@material-ui/core";
import { useAuth0 } from "./react-auth0-spa";
import NavBar from "./components/NavBar";
import Welcome from "./views/Welcome/";
import Home from "./views/Home/";
import SetLocation from "./views/SetLocation/";

const useStyles = makeStyles({
  content: {
    // marginTop: 64
  }
});
export default function App() {
  const { isAuthenticated } = useAuth0();
  const classes = useStyles();
  return (
    <div className="App">
      <NavBar />
      <div className={classes.content}>
        {isAuthenticated ? (
          <Router>
            <Home path="/" />
            {/*TODO: Set location redirect when user is new + doesn't have one. */}
            <SetLocation path="/set-location" />
          </Router>
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
}
