import React from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Box, Button, Typography } from "@material-ui/core";

export function NavBar (): React.ReactElement {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <div>
      {isAuthenticated ?
        <Button
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => logout()}
        >
          Logout
        </Button>
        :
        <Button
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => loginWithRedirect({})}
        >
          Login / Sign up
        </Button>
      }
    </div>
  )
};
