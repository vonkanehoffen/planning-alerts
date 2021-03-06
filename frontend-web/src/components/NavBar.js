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
import { ReactComponent as PlanningIcon } from "../images/planning-alerts-icon-round.svg";

const useStyles = makeStyles(theme => ({
  root: {
    // opacity: .5,
  },
  title: {
    flexGrow: 1
  },
  icon: {
    height: 45,
    "& .cls-1": {
      fill: "#ff0"
    },
    "& .cls-2": {
      fill: "#f00"
    }
  }
}));
export default function NavBar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <AppBar position="fixed" color="secondary" className={classes.root}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          <PlanningIcon className={classes.icon} />
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
