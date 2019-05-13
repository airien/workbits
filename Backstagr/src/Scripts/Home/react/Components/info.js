import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import api from "../api/artistApi";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: 16,
    padding: 16
  },
  listItem: {},
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
  card: {
    padding: 10
  },
  fab: {
    margin: theme.spacing.unit
  },
  textcontainer: { width: "100%" },
  itemtext: { paddingTop: "25px !important" }
});

class Info extends React.Component {
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  save = () => {
    var self = this;
    if (self.state.infoText.length === 0) return;

    console.log("save");
    api
      .post("/api/info/", {
        text: this.state.infoText
      })
      .then(function(response) {
        console.log(response);
        self.setState({ infoText: "", info: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  state = { info: [], loading: true, infoText: "" };
  componentDidMount() {
    this.getInfo();
  }
  getInfo() {
    var self = this;
    self.setState({ loading: true });
    api
      .get("/api/info")
      .then(response => {
        this.setState({ info: response.data, loading: false });
      })
      .catch(error => {
        //TODO: handle the error when implemented
      });
  }
  delete(id, name) {
    var self = this;
    console.log("delete", id);
    if (confirm("Vil du virkelig slette: " + name)) {
      api
        .delete("/api/info/" + id)
        .then(response => {
          self.setState({ info: response.data, loading: false });
        })
        .catch(error => {
          //TODO: handle the error when implemented
        });
    }
    var self = this;
  }
  items() {
    const { classes } = this.props;
    return this.state.info.map(item => (
      <Grid key={item.id} item xs={12} className={classes.listItem}>
        <div className={classes.card}>
          <Grid container spacing={24}>
            <Grid item xs={1}>
              <IconButton
                aria-label="Delete"
                className={classes.margin}
                onClick={() => this.delete(item.id, item.name)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={11} className={classes.itemtext}>
              <span>{item.text}</span>
            </Grid>
          </Grid>
        </div>
      </Grid>
    ));
  }
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>Meldinger</h1>
          </Grid>
          <Grid item xs={12} className={classes.info}>
            Vil du legge til en melding i info?
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="infoText"
              value={this.state.infoText}
              className={classes.textcontainer}
              onChange={this.handleChange("infoText")}
              margin="normal"
              multiline={true}
              rows={6}
              rowsMax={6}
              variant="outlined"
              InputProps={{ classes: { input: classes.textField } }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.save}
            >
              Lagre
            </Button>
          </Grid>
          {this.items()}
        </Grid>
      </Card>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Info));
