import React from "react";
import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItem,
  Grid,
  makeStyles
} from "@material-ui/core";
import { Home } from "@material-ui/icons";

// Unused..... Stick with just the map?

const useStyles = makeStyles({
  root: {
    height: "100vh",
    paddingTop: 64,
    overflow: "scroll"
  },
  primaryText: {
    // TODO: Text overflow
    // display: "flex",
    // position: "relative",
    // maxHeight: "4.6em",
    // overflow: "hidden",
    // textOverflow: 'ellipsis'
  }
});

export default function PlanningList({ planning_app }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {planning_app.map(app => (
        <ListItem alignItems="flex-start" key={app.ref}>
          <ListItemAvatar>
            <Avatar>
              <Home />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={app.proposal}
            secondary={app.address}
            classes={{ primary: classes.primaryText }}
          />
        </ListItem>
      ))}
    </List>
  );
}
