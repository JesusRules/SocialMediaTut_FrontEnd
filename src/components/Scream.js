import React, { Component } from 'react'
import {Typography } from '@mui/material';
// import withStyles from '@mui/material';
import {Link} from 'react-router-dom'
import '../App.css';
import dayjs from'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton.js';
//Icons
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

// MUI Stuff
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions.js';

//Not using - in css
const styles = {
    card: {
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

  likedScream = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) {
      return true;
    } else { 
      return false; 
    }
  }
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  }
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  }
  
  render() {
      dayjs.extend(relativeTime);
      const { classes, scream : {body, createdAt, userImage, 
        userHandle, screamId, likeCount, commentCount},
         user: { authenticated } } = this.props;

    const likeButton = !authenticated ? (
      //empty heart
      <MyButton tip="Like">
        <Link to='/login'>
          <FavoriteBorder color="primary"/>
        </Link>
      </MyButton>
    ) : (
      this.likedScream() ? (
        <MyButton tip="Undo like" onClick={this.unlikeScream}>
          <FavoriteIcon color="primary"/>
      </MyButton>
      ) : (
        <MyButton tip="Like" onClick={this.likeScream}>
          <FavoriteBorder color="primary"/>
      </MyButton>
      )
    )
    return (
      <Card style={styles.card}>
        <CardMedia
        image={userImage}
        title="Profile image" style={styles.image}/>
        <CardContent style={styles.content}>
            <Typography variant="h5" component={Link} to={`users/${userHandle}`} color="primary">{userHandle}</Typography>
            <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary"/>
            </MyButton>
            <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  likeScream,
  unlikeScream
}

// export default withStyles(styles)(Scream);
export default connect(mapStateToProps, mapActionsToProps)(Scream)
// export default (Scream)
