import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//withStyles
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import theme from '../../util/theme';
import MuiLink from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Icons
import LocationOn from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import CalendarToday from '@mui/icons-material/CalendarToday';

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
}

const StaticProfile = (props) => {
    const { profile: { handle, createdAt, imageUrl, bio, website, location }} = props; //not this.props cuz its a functional component

    return (
        <Paper style={styles.paper}>
            <div style={styles.profile}>
                <div style={styles.profileImageWrapper}>
                    <img src={imageUrl} alt="profile" style={styles.profileImage}/>
                </div>
                <hr style={styles.profileHR}/>
                <div style={styles.profileDetails}>
        <MuiLink style={{textDecoration: 'none' }} component={Link} to={`/user/${handle}`} color="primary" variant="h5">
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
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired
}

export default StaticProfile;