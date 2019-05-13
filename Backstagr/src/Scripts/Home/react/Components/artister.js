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

import Artist from "./artist";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
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
  item: {
    cursor: "-webkit-grab",
    cursor: "grab"
  },
  nopadding: {
    padding: "0px !important",
    textAlign: "right"
  },
  rightaligned: {
    textAlign: "right"
  }
});

class Artister extends React.Component {
  state = {
    artists: [],
    add: false,
    name: "",
    description: "",
    loading: true,
    artistid: null
  };

  componentDidMount() {
    this.getArtists();
  }
  getArtists() {
    api
      .get("/api/artist")
      .then(response => {
        this.setState({ artists: response.data, loading: false });
      })
      .catch(error => {
        //TODO: handle the error when implemented
      });
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  delete(id, name) {
    console.log("delete", id);
    if (confirm("Vil du virkelig slette: " + name)) {
      api
        .delete("/api/artist/" + id)
        .then(response => {
          self.setState({ artists: response.data, loading: false });
        })
        .catch(error => {
          //TODO: handle the error when implemented
        });
    }
    var self = this;
  }
  save() {
    var self = this;
    console.log("save");
    api
      .post("/api/artist/", {
        name: this.state.name,
        description: this.state.description
      })
      .then(function(response) {
        console.log(response);
        self.setState({
          add: false,
          artists: response.data,
          name: "",
          description: ""
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  lukk() {
    this.setState({ artistid: null });
    this.getArtists();
  }
  items() {
    const { classes, history } = this.props;
    return this.state.artists.map(item => (
      <Grid
        className={classes.item}
        key={item.id}
        item
        xs={12}
        onClick={() => history.push("/artist/" + item.id)}
      >
        <div className={classes.card}>
          <Grid container spacing={24}>
            <Grid item xs={11}>
              <span className={classes.titleText}>{item.name}</span>
            </Grid>
            <Grid item xs={1} className={classes.nopadding}>
              <IconButton
                aria-label="Delete"
                className={classes.nopadding}
                onClick={() => this.delete(item.id, item.name)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              {item.description}
            </Grid>

            <Grid item xs={2} className={classes.nopadding}>
              Raiderstørrelse: {item.items ? item.items.length : 0}
            </Grid>
          </Grid>
          <hr />
        </div>
      </Grid>
    ));
  }

  addButton() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Fab
          size="small"
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={() => this.setState({ add: true })}
        >
          <AddIcon />
        </Fab>
      </Grid>
    );
  }

  empty() {
    const { classes } = this.props;
    return (
      <Paper className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          {this.addButton()}
          <Grid item xs={12}>
            Ingen artister lagt til
          </Grid>
        </Grid>
      </Paper>
    );
  }
  artists() {
    const { classes } = this.props;
    return (
      <Paper className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          {this.addButton()}
          {this.items()}
        </Grid>
      </Paper>
    );
  }

  add() {
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
                this.setState({ add: false, name: "", description: "" })
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
    console.log("length", this.artists.length);
    if (this.state.add) {
      return this.add();
    } else if (!this.state.loading && this.state.artists.length === 0) {
      return this.empty();
    }
    return this.artists();
  }
}

Artister.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Artister));
