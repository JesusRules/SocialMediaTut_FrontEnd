import React, { Component, useEffect, useState } from 'react'
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
import { createTheme, ThemeProvider, Box } from '@mui/system';
import {styled} from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      HUGE: 3200,
    }
  }
})

//Not using - in css
const styles = {
    card: {
       position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image:{
      //minWidth: 200
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    },
    text: {
      [theme.breakpoints.up('lg')]: {
        minWidth: 50,
        backgroundColor: 'red',
      }
      // }
    }
}

// const CardSizeDiv = styled('div')(({theme}) => ({
const CardMediaStyled = styled(CardMedia)({
  [theme.breakpoints.down('666')]: {
    minWidth: 150,
  },
  [theme.breakpoints.up('666')]: {
    minWidth: 200,
  }
});

// const Responsive = styled('div')(({theme}) => ({
//   [theme.breakpoints.down('md')]: {
//     color: 'red'
//   }
// }));


const RespTest = () => {
  const [w, setW] = useState(window.innerWidth);

  useEffect(()=> {
    const handleResize = () => {
      setW(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    }, []);

    // const newTyp = w > 1000 ? (
    //   <Typography>YES!!!</Typography>
    //   ) : (
    //   null
    // )

    return (
      <div>
        {/* <Typography>Advanced Material UI</Typography>
        <Typography>{w}</Typography> */}
        {/* {newTyp} */}
      </div>
  );
}


class Scream extends Component {
  render() {
    // RespTest(); NOT in render
    
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

        {/* <CardSizeDiv> */}
        <CardMediaStyled
        image={userImage}
        title="Profile image" style={styles.image}/>
        {/* </CardSizeDiv> */}

        <CardContent style={styles.content}>
            {/* <Button onClick={changeHandleProfile} > */}
            <Link onClick={changeHandleProfile} to="">
            <Typography variant="h5" color="primary">{userHandle}</Typography>
            <RespTest/>
            {/* <Typography variant="h5" component={Link} to={`user/${userHandle}`} color="primary">{userHandle}</Typography> */}
            </Link>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
            <Typography variant="body1">{body}</Typography>
            <LikeButton screamId={screamId} />
            <span className={'scream-details'} style={styles.text}>{likeCount} Likes</span>
            <MyButton tip="Comments">
              <ChatIcon style={styles.text} color="primary"/>
            </MyButton>
            <span className={'scream-details'} style={styles.text}>{commentCount} Comments</span>
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
