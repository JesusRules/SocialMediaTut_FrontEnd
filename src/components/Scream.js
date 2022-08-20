import React, { Component } from 'react'
import {Typography } from '@mui/material';
// import withStyles from '@mui/material';
import {Link} from 'react-router-dom'
import '../App.css';
import dayjs from'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// MUI Stuff
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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
  render() {
      const { classes, scream : {body, createdAt, userImage, 
        userHandle, screamId, likeCount, commentCount} } = this.props;
    //   const classes = this.props.classes;
    dayjs.extend(relativeTime);
    return (
      <Card style={styles.card}>
        <CardMedia
        image={userImage}
        title="Profile image" style={styles.image}/>
        <CardContent style={styles.content}>
            <Typography variant="h5" component={Link} to={`users/${userHandle}`} color="primary">{userHandle}</Typography>
            <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
            <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    )
  }
}

// export default withStyles(styles)(Scream);
export default Scream;
