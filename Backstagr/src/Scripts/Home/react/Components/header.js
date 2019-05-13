import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

const styles = theme => ({
  menuItem: {
    fontSize: 20,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  main: { height: "100%" }
});

function Header(props) {
  const { classes, history } = props;

  return (
    <Paper className={classes.main}>
      <MenuList>
        {/* <MenuItem className={classes.menuItem} onClick={() => history.push('/')}>
            <ListItemIcon className={classes.icon}>
              <SendIcon />
            </ListItemIcon>
            <Link to='/'>Home</Link>
          </MenuItem> */}
        <MenuItem
          className={classes.menuItem}
          onClick={() => history.push("/artister")}
        >
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <Link to="/artister">Artister</Link>
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => history.push("/info")}
        >
          <ListItemIcon className={classes.icon}>
            <InboxIcon />
          </ListItemIcon>
          <Link to="/info">Info</Link>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Header));
