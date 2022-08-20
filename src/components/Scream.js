import React, { Component } from 'react'
import {withStyles, Typography } from '@mui/material';

// MUI Stuff
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const styles = {
    card: {
        display: 'flex'
    }
}

class Scream extends Component {
  render() {
      const { classes, scream : {body, createdAt, userImage, 
        userHandle, screamId, likeCount, commentCount} } = this.props;
    //   const classes = this.props.classes;
    //   const scream = this.props.scream;
    return (
      <Card>
        <CardMedia
        image={userImage}
        title="Profile image"/>
        <CardContent>
            <Typography variant="h5">{userHandle}</Typography>
            <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
            <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Scream);
