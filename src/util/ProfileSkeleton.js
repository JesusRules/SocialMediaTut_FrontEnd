import React from 'react'
import PropType from 'prop-types'
//withstyles
import NoImg from '../images/no-img.png'
// MUI
import Paper from '@mui/material/Paper'
//Icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';
import theme from './theme';

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
    },


    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto',
    },
    fullLine: {
        height: 15,
        // backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '100%',
        marginBottom: 10,
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10,
    }
}

const ProfileSkeleton = (props) => {
    const { classes } = props;
  return (
    <Paper styles={styles.paper}>
        <div style={styles.profile}>
            <div style={styles.profileImageWrapper}>
                <img src={NoImg} alt="profile" style={styles.profileImage} />
            </div>
            <hr/>
            <div style={styles.profileDetails}>
                <div style={styles.handle}/>
                <hr/>
                <div style={styles.fullLine}/>
                <div style={styles.fullLine}/>
                <hr/>
                <LocationOn color="primary"/> <span>Location</span>
                <hr/>
                <LinkIcon color="primary"/> https://website.com
                <hr/>
                <CalendarToday color="primary"/>Joined date
                <hr/>
            </div>
        </div>
    </Paper>
  )
}

ProfileSkeleton.propTypes = {
    // classes: PropTypes.object.isRequired
}

export default ProfileSkeleton
