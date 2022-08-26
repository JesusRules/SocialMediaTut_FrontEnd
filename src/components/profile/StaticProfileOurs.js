import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails.js';
import ProfileSkeleton from '../../util/ProfileSkeleton.js'
// MUI Stuff
import Button from '@mui/material/Button';
import theme from '../../util/theme';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MyButton from '../../util/MyButton.js'

//Icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturn from '@mui/icons-material/KeyboardReturn';
//Redux
import {connect} from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions.js';
import { style } from '@mui/system';

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

};


class StaticProfileOurs extends Component {
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
    handleLogout = () => {
        this.props.logoutUser();
    }
  render() {
      const {user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, 
      loading,
      authenticated}} = this.props;
      //NEW!
      const { profile } = this.props;
      const ourProfile = handle === profile.handle ? true : false
    
      let profileMarkup = !loading ? (authenticated ? (

        <Paper style={styles.paper}>
            <div style={styles.profile}>
                <div style={styles.profileImageWrapper}>
                    
                    {ourProfile ? (
                    <img src={imageUrl} alt="profile" style={styles.profileImage}/>
                    ) : (
                    <img src={profile.imageUrl} alt="profile" style={styles.profileImage}/>
                    )}

                    <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>

                    {ourProfile && (
                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} style={styles.profileImageWrapperButton}>
                            <EditIcon color="primary"/>
                        </MyButton>
                    )}

                </div>
                <hr style={styles.profileHR}/>
                <div style={styles.profileDetails}>
        <MuiLink style={{textDecoration: 'none' }} component={Link} to={`/user/${profile.handle}`} color="primary" variant="h5">
            @{profile.handle}
        </MuiLink>
        <hr style={styles.profileHR}/>

        {bio && <Typography variant="body2">
            {ourProfile ? bio : profile.bio}
            </Typography>}

        <hr style={styles.profileHR}/>
        {location && (
            <Fragment>
                <LocationOn color="primary"/> <span> {ourProfile ? location : profile.location}</span>
            <hr style={styles.profileHR}/>
            </Fragment>
        )}
        {website && (
            <Fragment>
                <LinkIcon color="primary"/>
                <a style={{color: theme.palette.primary.main }} href={ourProfile ? website : profile.website} target="_blank" rel="noopener noreferrer">
                    {' '}{ourProfile ? website : profile.website}
                </a>
                <hr style={styles.profileHR}/>
            </Fragment>
        )}
        <CalendarToday color="primary"/>{' '}
        <span>Joined {dayjs(ourProfile ? createdAt : profile.createdAt).format('MMM YYYY')}</span>
                </div>
            
            {/* LOG OUT BUTTON ALTERED */}
        {/* {ourProfile && (
            <MyButton tip="Logout" onClick={this.handleLogout} >
            <KeyboardReturn color="primary"/>
            </MyButton>
        )} */}
            <MyButton style={{paddingBottom: '2rem'}} tip="Logout" >
            {/* <KeyboardReturn color="primary"/> */}
            </MyButton>

        {ourProfile && (
            <EditDetails/>
        )}
            </div>
        </Paper>
      ) : (
        <Paper style={styles.paper}>
            <Typography variant="body2" align="center">
                No profile found, please login again</Typography>
            <div style={styles.buttons}>

            <Button style={{marginRight: 7}} variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
            
            <Button variant="contained" color="secondary" component={Link} to="/signup">
                Signup
            </Button>
            </div>
        </Paper>
      )) : (
        <ProfileSkeleton/>
      )

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

StaticProfileOurs.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(StaticProfileOurs)
