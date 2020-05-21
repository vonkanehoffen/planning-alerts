import React from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography, Toolbar, IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PA Admin
          </Typography>
          <Button onClick={() => history.push("/councils")} color="inherit">Councils</Button>
          <Button onClick={() => history.push("/scrape-log")} color="inherit">Scrape Log</Button>
          {isAuthenticated ?
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              onClick={() => logout()}
            >
              Logout
            </Button>
            :
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              onClick={() => loginWithRedirect({})}
            >
              Login / Sign up
            </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
