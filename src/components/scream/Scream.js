import React, { Component } from 'react'
import {Typography } from '@mui/material';
// import withStyles from '@mui/material';
import {Link} from 'react-router-dom'
import '../../App.css';
import dayjs from'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton.js';
import DeleteScream from './DeleteScream.js';
import ScreamDialog from './ScreamDialog.js';
//Icons
import ChatIcon from '@mui/icons-material/Chat';
// MUI Stuff
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { connect } from 'react-redux';
import LikeButton from './LikeButton.js';

//Not using - in css
const styles = {
    card: {
       position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200,
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {
  //  changeHandleProfile = () => {
  //   // window.location.href = `/user/${userHandle}`;    
  // }
  render() {
      const changeHandleProfile = () => {
        window.location.href = `/user/${userHandle}`;    
      }

      dayjs.extend(relativeTime);

      const { classes, scream : {body, createdAt, userImage, 
        userHandle, screamId, likeCount, commentCount},
         user: { authenticated, credentials: { handle } } } = this.props;

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId}/>
    ) : null

    return (
      <Card style={styles.card}>
        <CardMedia
        image={userImage}
        title="Profile image" style={styles.image}/>
        <CardContent style={styles.content}>
            {/* <Button onClick={changeHandleProfile} > */}
            <Link onClick={changeHandleProfile} to="">
            <Typography variant="h5" color="primary">{userHandle}</Typography>
            {/* <Typography variant="h5" component={Link} to={`user/${userHandle}`} color="primary">{userHandle}</Typography> */}
            </Link>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
            <Typography variant="body1">{body}</Typography>
            <LikeButton screamId={screamId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="Comments">
              <ChatIcon color="primary"/>
            </MyButton>
            <span>{commentCount} Comments</span>
            <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired
  openDialog: PropTypes.bool

}

const mapStateToProps = (state) => ({
  user: state.user,
})

// export default withStyles(styles)(Scream);
export default connect(mapStateToProps)(Scream)
// export default (Scream)
