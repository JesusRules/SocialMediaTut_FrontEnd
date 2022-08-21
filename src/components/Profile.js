import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI Stuff
import Button from '@mui/material/Button';
import theme from '../util/theme';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

//Icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
//Redux
import {connect} from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions.js';

const styles = {
    paper: {
        padding: 20,
        // width: '400px'
    },
    profileImageWrapper: {
        textAlign: 'center',
        position: 'relative',
    
    },
    profileImageWrapperButton: {
        position: 'absolute',
                top:'80%',
                left: '70%'
    },
    profileImage: {
        width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
    },
    profileDetails: {
        textAlign: 'center',
        verticalAlign: 'middle',
        // color: theme.palette.primary.main,
    },
    profileHR: {
        border: 'none',
        margin: '0 0 10px 0'
    },
    profileButton: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    buttons: {
        textAlign:'center',
        margin: '20px 10px'
        // '& a': {
        
    }

    // profile: {
    //     '& .image-wrapper': {
    //         textAlign: 'center',
    //         position: 'relative',
    //         '& button': {
    //             position: 'absolute',
    //             top:'80%',
    //             left: '70%'
    //         }
    //     },
    //     '& .profile-image': {
    //         width: 200,
    //         height: 200,
    //         objectFit: 'cover',
    //         maxWidth: '100%',
    //         borderRadius: '50%'
    //     },
    //     '& .profile-details': {
    //         textAlign: 'center',
    //         '& span, svg': {
    //             verticalAlign: 'middle'
    //         },
    //         '& a': {
    //             color: theme.palette.primary.main
    //         }
    //     },
    //     '& hr': {
    //         border: 'none',
    //         margin: '0 0 10px 0'
    //     },
    //     '& svg.button': {
    //         '&:hover': {
    //             cursor: 'pointer'
    //         }
    //     }
    // },
    // buttons: {
    //     textAlign:'center',
    //     '& a': {
    //         margin: '20px 10px'
    //     }
    // }
};


class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
  render() {
      const {classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, 
      loading,
      authenticated}} = this.props;
    
      let profileMarkup = !loading ? (authenticated ? (

        <Paper style={styles.paper}>
            <div style={styles.profile}>
                <div style={styles.profileImageWrapper}>
                    <img src={imageUrl} alt="profile" style={styles.profileImage}/>
                    <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                    <Tooltip title="Edit profile picture" placement="top">
                        <IconButton onClick={this.handleEditPicture} style={styles.profileImageWrapperButton}>
                            <EditIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <hr style={styles.profileHR}/>
                <div style={styles.profileDetails}>
        <MuiLink style={{textDecoration: 'none' }} component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
        </MuiLink>
        <hr style={styles.profileHR}/>
        {bio && <Typography variant="body2">{bio}</Typography>}
        <hr style={styles.profileHR}/>
        {location && (
            <Fragment>
                <LocationOn color="primary"/> <span>{location}</span>
            <hr style={styles.profileHR}/>
            </Fragment>
        )}
        {website && (
            <Fragment>
                <LinkIcon color="primary"/>
                <a style={{color: theme.palette.primary.main }} href={website} target="_blank" rel="noopener noreferrer">
                    {' '}{website}
                </a>
                <hr style={styles.profileHR}/>
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
    user: state.user,
});

const mapActionsToProps = { 
    logoutUser,
    uploadImage
};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
    // classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
