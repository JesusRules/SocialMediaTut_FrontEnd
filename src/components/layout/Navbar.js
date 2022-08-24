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
import UnsignedIcon from '../../images/no-img.png'
import { logoutUser } from '../../redux/actions/userActions.js';
// import BasicMenu from '../../util/BasicMenu.js'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdUnitsIcon from '@mui/icons-material/AdUnits';

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
    borderRadius: '50%',
  },
  menuButton: {
    position: 'absolute',
    left: '50%',
    color: 'black'
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
  
  

  const MUIMenuProfile = ({handleLogout, authenticated}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClickedLogout = () => {
      // this.props.logoutUser();
      setAnchorEl(null);
      handleLogout();
      window.location.href = '/login';
    };
    return (
      <div>

          <ProfileIconStyle>
          {/* <MyButton onClick={this.handleLogout} style={styles.profileIcon} tip="Profile"> */}
          <Button style={styles.profileIcon}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
            
            {authenticated ? (
            <img src={AppIcon} style={styles.profileIconImage}/> 
            ) : (
              <img src={UnsignedIcon} style={styles.profileIconImage}/> 
            )}

            </Button>
          </ProfileIconStyle>

          {authenticated ? (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleClickedLogout}>Logout</MenuItem>
                </Menu>
                  ) : (
                    null
                  )}
      </div>
    );
  }




class Navbar extends Component {
    handleLogout = () => {
      this.props.logoutUser();
  }

  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
              {/* <ProfileIconStyle>
              <Link to="/login">
              <MyButton onClick={this.handleLogout} style={styles.profileIcon} tip="Profile">
                <img src={AppIcon} style={styles.profileIconImage}/>
              </MyButton>
              </Link>
              </ProfileIconStyle> */}
              <MUIMenuProfile authenticated={authenticated} handleLogout={this.handleLogout}/>
              
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

const mapActionsToProps = { 
  logoutUser
};

// Profile.propTypes = {
//   user: PropTypes.object.isRequired,
//   logoutUser: PropTypes.func.isRequired,
//   uploadImage: PropTypes.func.isRequired
//   // classes: PropTypes.object.isRequired,
// }


export default connect(mapStateToProps, mapActionsToProps)(Navbar)
