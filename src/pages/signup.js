import React, { Component } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom';
// import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/pokes4.png';
// MUI Stuff
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import withRouter from "react-router";
// Redux stuff
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions.js'

// const styles = (theme) => ({
//   ...theme
// })
const styles = {
  form: {
    textAlign: 'center',
    paddingBottom: '4.9rem',
  },
  image: {
    margin: '20px auto 20px auto',
    width: 280,
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto',
    width: '100%',
    maxWidth: '30em',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  div: {
    // width: '32rem'
  }
}

export class signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    }
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors){
      this.setState({ errors: nextProps.UI.errors});
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { UI: {loading} } = this.props;
    const {errors} = this.state;
    return (
      <Grid con style={styles.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="Poki" style={styles.image}/>
          <Typography variant="h2" style={styles.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>

            <TextField id="email" name="email" type="email" label="Email" 
            helperText={errors.email} error={errors.email ? true : false} style={styles.textField}
            value={this.state.email} variant="standard" onChange={this.handleChange} fullWidth/>
            <br />
            <TextField id="password" name="password" type="password" label="Password" 
            helperText={errors.password} error={errors.password ? true : false} style={styles.textField}
            value={this.state.password} variant="standard" onChange={this.handleChange} fullWidth/>
            <br />
            <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
            helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} style={styles.textField}
            value={this.state.confirmPassword} variant="standard" onChange={this.handleChange} fullWidth/>
            <br />
            <TextField inputProps={{ maxLength: 20 }} id="handle" name="handle" type="text" label="Name" 
            helperText={errors.handle} error={errors.handle ? true : false} style={styles.textField}
            value={this.state.handle} variant="standard" onChange={this.handleChange} fullWidth/>
            {errors.general && (
              <Typography variant="body2" style={styles.customError}>
                {errors.general}
              </Typography>
            )}
            <div style={styles.div}/>
            <Button type="submit" variant="contained" color="primary" 
            style={styles.button} disabled={loading}>
              Signup
              {loading && (
              <CircularProgress size={30} style={styles.progress}/>
              )}
            </Button>
            <br />
            <small>Already have an account? <Link style={{fontWeight: 'bold', color:"#00bcd4"}} to="/login">Login here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

signup.propTypes = {
  // classes: PropTypes.object.isRequired
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(signup);
// export default signup;
