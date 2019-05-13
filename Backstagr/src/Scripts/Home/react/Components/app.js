import React from "react";
import { Link } from "react-router-dom";

import Header from "./header";
import Main from "./main";
import PropTypes from "prop-types";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

const styles = theme => ({
  icon: {},
  header: {
    background: "rgb(241, 244, 249)"
  },
  headertext: {
    margin: "auto",
    width: "100%",
    textAlign: "center",
    padding: 10,
    paddingTop: 75,
    fontSize: 70
  },
  heart: { height: 200 }
});

function App(props) {
  const { classes } = props;

  return (
    <Grid container spacing={24}>
      <Grid item xs={2} className={classes.header}>
        <img src="../../../../../Content/heart.svg" className={classes.heart} />
      </Grid>

      <Grid item xs={10} className={classes.header}>
        <h1 className={classes.headertext}>Backstagr</h1>
      </Grid>
      <Grid item xs={2}>
        <Header />
      </Grid>
      <Grid item xs={10}>
        <Main />
      </Grid>
    </Grid>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
