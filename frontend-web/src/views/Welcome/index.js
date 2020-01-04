import React from "react";
import CenterVh from "../../components/CenterVh";
import { Box, Button, Typography } from "@material-ui/core";
import { ReactComponent as PlanningIcon } from "../../images/planning-alerts-icon-round.svg";
import { useAuth0 } from "../../react-auth0-spa";

/**
 * Welcome page for new / unauthenticated users
 * @returns {*}
 * @constructor
 */
export default function Welcome() {
  const { loginWithRedirect } = useAuth0();

  return (
    <CenterVh>
      <Box>
        <PlanningIcon style={{ width: 200 }} />
        <Typography variant="h2">Planning Alerts</Typography>
        <Typography variant="h3" gutterBottom>
          Stuff here
        </Typography>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => loginWithRedirect({})}
        >
          Login / Sign up
        </Button>
      </Box>
    </CenterVh>
  );
}
