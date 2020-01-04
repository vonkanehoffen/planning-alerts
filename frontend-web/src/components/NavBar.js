import React from "react";
import { Link, navigate } from "@reach/router";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));
export default function NavBar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <Link to="/" className={classes.title}>
          Planning Alerts
        </Link>

        {isAuthenticated ? (
          <>
            <Typography variant="subtitle1">Hi, {user.name}</Typography>
            <Button onClick={() => navigate("set-location")}>
              Set location
            </Button>
            <Button variant="outlined" onClick={() => logout()}>
              Log out
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={() => loginWithRedirect({})}>
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
