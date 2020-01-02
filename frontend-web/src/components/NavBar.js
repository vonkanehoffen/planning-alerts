import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useAuth0 } from "../react-auth0-spa";

export default function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Planning Alerts</Typography>

        {isAuthenticated ? (
          <>
            <Typography paragraph>Hi, {user.name}</Typography>
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
