import React, { Component, Fragment } from 'react'
import { PropTypes } from '@mui/material';
// import withStyles from 'asd'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI Stuff
import Button from '@mui/material/Button';
import theme from '../util/theme';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material';

//Icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';
//Redux
import {connect} from 'react-redux';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top:'80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign:'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});


class Profile extends Component {
  render() {
      const {classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, 
      loading,
      authenticated}} = this.props;
    
      let profileMarkup = !loading ? (authenticated ? (
        <Paper style={styles.paper}>
            <div style={styles.profile}>
                <div style={styles.profile['& .profile-image']}>
                    <img src={imageUrl} alt="profile"/>
                </div>
                <hr/>
                <div style={styles.profile['& .profile-details']}>
        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
        </MuiLink>
        <hr/>
        {bio && <Typography variant="body2">{bio}</Typography>}
        <hr/>
        {location && (
            <Fragment>
                <LocationOn color="primary"/> <span>{location}</span>
            <hr/>
            </Fragment>
        )}
        {website && (
            <Fragment>
                <LinkIcon color="primary"/>
                <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}{website}
                </a>
                <hr/>
            </Fragment>
        )}
        <CalendarToday color="primary"/>{' '}
        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
      ) : (
        <Paper style={styles.paper}>
            <Typography variant="body2" align="center">
                No profile found, please login again</Typography>
            <div style={styles.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
                Signup
            </Button>
            </div>
        </Paper>
      )) : (<p>loading...</p>)

      return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired
    // classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Profile)
