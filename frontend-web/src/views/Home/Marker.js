import React from "react";
import {
  Card,
  Typography,
  Fab,
  IconButton,
  CardContent,
  Box,
  Chip,
  makeStyles
} from "@material-ui/core";
import { Home, Close, AccountBalance, Event } from "@material-ui/icons";

const useStyles = makeStyles({
  active: {
    zIndex: 10,
    position: "absolute"
  },
  card: {
    width: 400
    // zIndex: 10
  }
});
export default function AppMarker({ app }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState();

  if (open)
    return (
      <div className={classes.active}>
        <Card className={classes.card}>
          <CardContent>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              {app.proposal}
            </Typography>
            <Typography variant="caption">{app.address}</Typography>
            <Box mt={1}>
              <Chip icon={<AccountBalance />} label={app.id} />
            </Box>
            <Box mt={1}>
              <Chip
                icon={<Event />}
                label={`Validated ${app.application_validated}`}
              />
            </Box>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <Fab size="small" color="secondary" onClick={() => setOpen(true)}>
      <Home />
    </Fab>
  );
}
