import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import api from "../api/artistApi";

import Fab from "@material-ui/core/Fab";

import OkIcon from "@material-ui/icons/Done";

import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { withRouter } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 16,
    marginRight: 16
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  uuid: {
    fontSize: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  card: {
    padding: 10
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  titleText: {
    fontSize: 33
  },
  iconbutton: {
    padding: 0
  },
  rightaligned: {
    textAlign: "right"
  },
  lukkbutton: {
    textAlign: "right",
    paddingRight: 12
  },
  okbutton: {
    paddingTop: "35px !important",
    textAlign: "right",
    color: "green"
  },
  cancelbutton: {
    paddingTop: "18px !important",
    textAlign: "right",
    color: "red"
  }
});
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
class Artist extends React.Component {
  state = {
    artist: null,
    loading: true,
    name: "",
    description: "",
    itemname: "",
    itemdescription: "",
    itemcount: 0,
    edit: false,
    addItem: false
  };

  componentDidMount() {
    this.getArtist();
  }
  getArtist() {
    this.setState({ loading: true });
    api
      .get("/api/artist/" + this.props.match.params.artistid)
      .then(response => {
        this.setState({
          artist: response.data,
          name: response.data.name,
          description: response.data.description,
          loading: false
        });
      })
      .catch(error => {
        //TODO: handle the error when implemented
      });
  }
  delete(id, name) {
    const { history } = props;
    var self = this;

    if (confirm("Vil du virkelig slette: " + name)) {
      api
        .delete("/api/artist/" + id)
        .then(response => {
          history.push("/artister");
        })
        .catch(error => {
          //TODO: handle the error when implemented
        });
    }
  }
  deleteItem(id, name) {
    var self = this;
    if (confirm("Vil du virkelig slette: " + name)) {
      var a = this.state.artist;
      a.items = a.items.filter(x => x.id !== id);
      api
        .put("/api/artist/" + a.id, a)
        .then(response => {
          self.getArtist();
        })
        .catch(error => {
          //TODO: handle the error when implemented
        });
    }
  }
  saveItem() {
    if (!this.state.itemname || this.state.itemname.length === 0) return;
    var self = this;
    var a = this.state.artist;
    if (!a.items) a.items = [];
    var newitem = {
      id: generateUUID(),
      name: this.state.itemname,
      description: this.state.itemdescription,
      count: this.state.itemcount
    };

    a.items.push(newitem);
    api
      .put("/api/artist/" + a.id, a)
      .then(response => {
        self.getArtist();
        self.setState({
          addItem: false,
          itemcount: 0,
          itemname: "",
          itemdescription: ""
        });
      })
      .catch(error => {
        //TODO: handle the error when implemented
      });
  }

  save() {
    var self = this;
    api
      .put("/api/artist/" + this.props.match.params.artistid, {
        name: this.state.name,
        description: this.state.description,
        id: this.state.artist.id,
        items: this.state.artist.items,
        type: this.state.artist.type
      })
      .then(function(response) {
        self.setState({
          edit: false,
          artist: response.data,
          name: response.data.name,
          description: response.data.description
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  item() {
    const { classes } = this.props;
    var item = this.state.artist;
    return (
      <Grid item xs={12}>
        <div className={classes.card}>
          <Grid container spacing={24}>
            <Grid item xs={11}>
              <span className={classes.titleText}>{item.name}</span>
            </Grid>
            <Grid item xs={1} className={classes.rightaligned}>
              <IconButton
                aria-label="Delete"
                className={classes.iconbutton}
                onClick={() => this.delete(item.id, item.name)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {item.description}
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }

  editButton() {
    const { classes } = this.props;
    return (
      <Grid item xs={10}>
        <Fab
          size="small"
          color="primary"
          aria-label="Edit"
          className={classes.fab}
          onClick={() => this.setState({ edit: true })}
        >
          <EditIcon />
        </Fab>
      </Grid>
    );
  }

  empty() {
    const { classes } = this.props;
    return (
      <Paper className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            Ingen artist valgt
          </Grid>
        </Grid>
      </Paper>
    );
  }
  artist() {
    const { classes, history } = this.props;
    return (
      <Paper className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          {this.editButton()}
          <Grid item xs={2} className={classes.lukkbutton}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => {
                history.push("/artister");
              }}
            >
              Lukk
            </Button>
          </Grid>
          {this.item()}
          <Grid item xs={11}>
            <span className={classes.titleText}>
              Raider (
              {this.state.artist.items ? this.state.artist.items.length : 0})
            </span>
          </Grid>

          <Grid item xs={1}>
            <Fab
              size="small"
              color="primary"
              aria-label="AddItem"
              className={classes.fab}
              onClick={() => this.setState({ addItem: true })}
            >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <hr />
            {this.itemList()}
          </Grid>
          {this.addItem()}
        </Grid>
      </Paper>
    );
  }
  addItem() {
    if (!this.state.addItem) {
      return;
    }

    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <TextField
              required
              id="standard-required"
              label="Navn"
              value={this.state.itemname}
              className={classes.textcontainer}
              onChange={this.handleChange("itemname")}
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="standard-required"
              label="Beskrivelse"
              value={this.state.itemdescription}
              className={classes.textcontainer}
              onChange={this.handleChange("itemdescription")}
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              id="standard-required"
              label="Antall"
              value={this.state.itemcount}
              className={classes.textcontainer}
              onChange={this.handleChange("itemcount")}
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item xs={1} className={classes.okbutton}>
            <IconButton
              aria-label="Ok"
              className={classes.iconbutton}
              onClick={() => this.saveItem()}
            >
              <OkIcon fontSize="small" />
            </IconButton>
          </Grid>

          <Grid item xs={1} className={classes.cancelbutton}>
            <IconButton
              aria-label="Cancel"
              className={classes.cancelbutton}
              onClick={() => this.setState({ addItem: false })}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  itemList() {
    const { classes } = this.props;
    return !this.state.artist.items ? (
      <span>...</span>
    ) : (
      this.state.artist.items.map(item => (
        <Grid item xs={12} key={item.id}>
          <div className={classes.card}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                {item.name}
              </Grid>
              <Grid item xs={5}>
                {item.description}
              </Grid>
              <Grid item xs={2} className={classes.rightaligned}>
                Antall: {item.count}
              </Grid>
              <Grid item xs={1} className={classes.rightaligned}>
                <IconButton
                  aria-label="Delete"
                  className={classes.iconbutton}
                  onClick={() => this.deleteItem(item.id, item.name)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </Grid>
      ))
    );
  }
  edit() {
    const { classes } = this.props;
    return (
      <Paper className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="standard-required"
              label="Navn"
              value={this.state.name}
              className={classes.textcontainer}
              onChange={this.handleChange("name")}
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="standard-required"
              label="Beskrivelse"
              value={this.state.description}
              className={classes.textcontainer}
              onChange={this.handleChange("description")}
              className={classes.textField}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.save()}
            >
              Lagre
            </Button>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() =>
                this.setState({ edit: false, name: "", description: "" })
              }
            >
              Avbryt
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  render() {
    if (this.state.edit) {
      return this.edit();
    } else if (this.state.loading || !this.state.artist) {
      return this.empty();
    } else {
      return this.artist();
    }
  }
}

Artist.propTypes = {
  classes: PropTypes.object.isRequired,
  lukk: PropTypes.func
};

export default withRouter(withStyles(styles)(Artist));
