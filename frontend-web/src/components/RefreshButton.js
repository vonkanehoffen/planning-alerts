import React from 'react'
import { Button, makeStyles, Fab } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 20,
    left: 20
  }
}));

export default function RefreshButton ({ doRefresh }) {
  const classes = useStyles();
  return (
    <Fab className={classes.root} aria-label="Refresh" color="secondary" onClick={doRefresh}><Refresh/></Fab>
  )
}
