import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import MyButton from '../../util/MyButton.js';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import PostScream from '../scream/PostScream.js';
// MUI stuff
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
// Icons
import HomeIcon from '@mui/icons-material/Home';
import Notifications from '@mui/icons-material/Notifications';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              {/* <Tooltip> */}
              <PostScream/>
              <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
              </Link>

              <MyButton tip="Notifications">
                <Notifications />
              </MyButton>

            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
              </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar)