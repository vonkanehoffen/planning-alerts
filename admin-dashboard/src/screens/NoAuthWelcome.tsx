import React from "react";
import { Button, Typography } from '@material-ui/core'
import { useAuth0 } from '../react-auth0-spa'
import CenterVh from '../components/CenterVh'

export const NoAuthWelcome: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <CenterVh>
      <Typography variant="h1">Planning Alerts Admin</Typography>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        onClick={() => loginWithRedirect({})}
      >
        Login / Sign up
      </Button>
    </CenterVh>
  );
}
