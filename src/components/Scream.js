import React, { Component } from 'react'
import {Typography } from '@mui/material';
// import withStyles from '@mui/material';
import {Link} from 'react-router-dom'

// MUI Stuff
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// const styles = theme => ({
//     card: {
//         display: 'flex'
//     }
// });

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200,
    },
    content:{
        padding: 25
    }
}

class Scream extends Component {
  render() {
      const { classes, scream : {body, createdAt, userImage, 
        userHandle, screamId, likeCount, commentCount} } = this.props;
    //   const classes = this.props.classes;
    //   const scream = this.props.scream;
    return (
      <Card className={classes.card}>
        <CardMedia
        image={userImage}
        title="Profile image" className={classes.image}/>
        <CardContent >
            <Typography variant="h5" component={Link} to={`users/${userHandle}`} color="primary">{userHandle}</Typography>
            <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
            <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Scream);
// export default Scream;
