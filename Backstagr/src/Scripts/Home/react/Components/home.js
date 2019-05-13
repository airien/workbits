import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import api from "../api/artistApi";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 16,
    marginRight: 16
  },
  textcontainer: {
    width: "90%"
  },
  textField: {
    height: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  info: {
    marginTop: 50
  }
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>Velkommen til backstageraideren for Oslo Pride</h1>
          </Grid>
        </Grid>

        {/* 
  
          <TextField
            id="standard-uncontrolled"
            label="Uncontrolled"
            defaultValue="foo"
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            error
            id="standard-error"
            label="Error"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            disabled
            id="standard-disabled"
            label="Disabled"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
  
          <TextField
            id="standard-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
  
          <TextField
            id="standard-dense"
            label="Dense"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
          />
  
          <TextField
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            value={this.state.multiline}
            onChange={this.handleChange('multiline')}
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            id="standard-helperText"
            label="Helper text"
            defaultValue="Default Value"
            className={classes.textField}
            helperText="Some important text"
            margin="normal"
          />
  
          <TextField
            id="standard-with-placeholder"
            label="With placeholder"
            placeholder="Placeholder"
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            id="standard-textarea"
            label="With placeholder multiline"
            placeholder="Placeholder"
            multiline
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            id="standard-number"
            label="Number"
            value={this.state.age}
            onChange={this.handleChange('age')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
  
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
          />
  
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your currency"
            margin="normal"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Native select"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your currency"
            margin="normal"
          >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
  
          <TextField
            id="standard-bare"
            className={classes.textField}
            defaultValue="Bare"
            margin="normal"
          /> */}
      </Card>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
