import React, { Component } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom';
// import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
// MUI Stuff
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import {Link} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import withRouter from "react-router";

// const styles = (theme) => ({
//   ...theme
// })
const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
}


export class login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }
  

  
  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('https://us-central1-socialape-14d54.cloudfunctions.net/api/login', userData)
    .then(res => {
      console.log(res.data); //axios is res.data
      localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
      this.setState({ //if post is successful, set loading off
        loading: false
      });
      // this.props.history.push('/');
      window.location.href = '/';
    })
    .catch(err => {
      this.setState({
        errors: err.response.data,
        loading: false
      })
    })
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    const {errors, loading} = this.state;
    return (
      <Grid container style={styles.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="monkey" style={styles.image}/>
          <Typography variant="h2" style={styles.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>

            <TextField id="email" name="email" type="email" label="Email" 
            helperText={errors.email} error={errors.email ? true : false} style={styles.textField}
            value={this.state.email} variant="standard" onChange={this.handleChange} fullWidth/>

            <TextField id="password" name="password" type="password" label="Password" 
            helperText={errors.password} error={errors.password ? true : false} style={styles.textField}
            value={this.state.password} variant="standard" onChange={this.handleChange} fullWidth/>
            {errors.general && (
              <Typography variant="body2" style={styles.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" 
            style={styles.button} disabled={loading}>
              Login
              {loading && (
              <CircularProgress size={30} style={styles.progress}/>
              )}
            </Button>
            <br />
            <small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

// login.propTypes = {
//   classes: PropTypes.object.isRequired
// }

// export default login
export default login;
