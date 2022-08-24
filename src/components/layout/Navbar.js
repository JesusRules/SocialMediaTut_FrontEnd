import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import MyButton from '../../util/MyButton.js';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import PostScream from '../scream/PostScream.js';
import Notifications from './Notifications.js'
// MUI stuff
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
// Icons
import HomeIcon from '@mui/icons-material/Home';
import {styled} from '@mui/material/styles';
import { createTheme, ThemeProvider, Box } from '@mui/system';
import AppIcon from '../../images/pokes4.png'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      HUGE: 3200,
    }
  }
})


const styles = {
  profileIcon: {
    position: 'absolute',
    top: -4,
    // left: 5,
    transform: 'translateX(15px)'
  },
  profileIconImage: {
    width: 55,
  }
}

  const ProfileIconStyle = styled('div')({
    [theme.breakpoints.up('1220')]: {
      width: '100%',
      maxWidth: '75em',
      margin: '0 auto',
      // paddingLeft: '1.5rem',
      // paddingRight: '1.5rem',
    }
  });          

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
              <ProfileIconStyle>
              <Link to="/login">
              <MyButton style={styles.profileIcon} tip="Profile">
                {/* <HomeIcon /> */}
                <img src={AppIcon} style={styles.profileIconImage}/>
              </MyButton>
              </Link>
              </ProfileIconStyle>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>


              <PostScream/>

              <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
              </Link>

                <Notifications />

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
