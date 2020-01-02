import React from "react";
import { Link } from "@reach/router";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useAuth0 } from "../react-auth0-spa";

export default function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">Planning Alerts</Link>

        {isAuthenticated ? (
          <>
            <Typography paragraph>Hi, {user.name}</Typography>
            <Link to="set-location">Set location</Link>
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
