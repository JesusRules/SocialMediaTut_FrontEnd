import React, { Component, useEffect, useState } from 'react'
// import {Typography } from '@mui/material';
// import Typography from '@mui/joy/Typography';
import Typography from '@mui/material/Typography';
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
import useWindowSize from '../../util/useWindowSize.js'
import {getUserData, getScream, getScreams} from '../../redux/actions/dataActions.js'
import axios from 'axios';

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
        // paddingRight: 300
    },
    image:{
      //minWidth: 200
      // paddingRight: 10,
    },
    content:{
        paddingLeft: 21,
        
        // objectFit: 'cover'
    },
    text: {
      paddingTop: 3,
      marginTop: '0.5rem',
      fontSize: 16,
      position: 'relative',
      top: '11px',
      right: '7px'
      // }
    }
}

// const CardSizeDiv = styled('div')(({theme}) => ({
const CardMediaStyled = styled(CardMedia)({
  [theme.breakpoints.down('666')]: {
    minWidth: 140,
  },
  [theme.breakpoints.up('666')]: {
    minWidth: 220,
  }
});            

// const Responsive = styled('div')(({theme}) => ({
//   [theme.breakpoints.down('md')]: {
//     color: 'red'
//   }
// }));

const RespNextLine = () => {
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

    const newTyp = w < 445 ? (
      <br/>
      ) : (
      null
    )
    
    return (
      <>
        {newTyp}
      </>
  );
}


// let globalCommentCount;
// export function RetrieveCommentCount(commentCount) {
//      console.log("NEW: " + commentCount);
//      globalCommentCount = commentCount;
//      console.log("GLOBAL: " + globalCommentCount);
// }

let myWildString = '';
let commentCountG = 320;

class Scream extends Component {
  
  state = {
    commentCount: 0,
  };

  componentDidMount() {
    this.setState({commentCount: this.props.scream.commentCount});
    //GOOD TOO
    // axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${this.props.scream.screamId}`)
    // .then(res => {
    //     console.log(`${res.data.screamId}/${res.data.commentCount}`);
    //     myWildString = `${res.data.screamId}/${res.data.commentCount}`;
    // })
    // .catch(err => console.log(err));

      //   setTimeout(() => {
      //     if (myWildString !== '') {
      //     const stringId = myWildString.split('/')[0];
      //     console.log("NAME: " + stringId);
      //     const stringCount = myWildString.split('/')[1];
      //     console.log("COUNT: " + stringCount);

      //     // console.log('ID creator: ' + screamId);
      //     // console.log('ID updated: ' + stringId);
      //     if (this.props.scream.screamId == stringId) {
      //       console.log('REACHED');
      //       this.setState({commentCount: parseInt(stringCount)});
      //     }
      //   }
      // }, 1000);

  }

    // this.props.updateCount(this.props.screamId);
    
    componentWillReceiveProps(nextProps) {
      // WORKS but ONLY 1 comment count at a time!!! Calls global variable and gets sent FROM CommentForm - line 96 AND 121-from here
      // setTimeout(() => {
      //   console.log("Global sscomment Count: " + globalCommentCount);
      //   this.setState({commentNew: globalCommentCount});
      //    }, 1000);

         //GOOD TOO
        //     axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${this.props.scream.screamId}`)
        //     .then(res => {
        //         console.log(`${res.data.screamId}/${res.data.commentCount}`);
        //         myWildString = `${res.data.screamId}/${res.data.commentCount}`;
        // })
        // .catch(err => console.log(err));
      }
    
    render() {
      // RespTest(); NOT in render
    
    const changeHandleProfile = () => {
      window.location.href = `/user/${userHandle}`;    
    }
    
    dayjs.extend(relativeTime);
    
    let { classes, scream : {body, createdAt, userImage, 
      userHandle, screamId, likeCount, commentCount},
      user: { authenticated, credentials: { handle } } } = this.props;
      // const { classes, scream : {body, createdAt, userImage, 
      //   userHandle, screamId, likeCount, commentCount},
      //    user: { authenticated, credentials: { handle } } } = this.props;
      commentCountG = commentCount;

      //OLD TIMEOUT

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId}/>
    ) : null

    let newString = '';
    if (body) {
        newString = body.replace(/(.{20})/g, "$1<br/>");
    }

    return (
      <Card style={styles.card}>

        <CardMediaStyled
        image={userImage}
        title="Profile image" style={styles.image}/>

        <CardContent style={styles.content}>
            
            <Link onClick={changeHandleProfile} to="">
            <Typography style={{fontSize: 22.3}} variant="h5" color="primary">{userHandle}</Typography>
            {/* <RespTest/> */}
            </Link>

            {deleteButton}
            
            <Typography style={{fontStyle: 'italic', fontSize: 13.3}}variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
            
            <Typography style={{paddingTop: 2, fontSize: 16}} variant="body1">
            {/* {newString.split("<br/>").join("\n")} */}
            {body}
              </Typography>
            
            <div style={styles.text}>
            <LikeButton screamId={screamId} />
            <span className={'scream-details'} >{likeCount} </span>   

        {/* <RespNextLine/> */}
        
            {/* <MyButton tip="Comments">
              <ChatIcon  color="primary"/>
            </MyButton> */}
            <ScreamDialog commentButton={true} screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
            <span className={'scream-details'} >{commentCount} </span>
            {/* <span className={'scream-details'} >{this.state.commentCount} </span> */}
            </div>
            
            <ScreamDialog commentButton={false} screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
        </CardContent>

      </Card>
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  // updateCount: PropTypes.func.isRequired,
  // scream: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired
  openDialog: PropTypes.bool

}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI
  //DONT USE scream: state.data.scream,
})

const mapActionsToProps = { 
  // likeScream
  getScream,
  getScreams,
  getUserData,
};

// export default withStyles(styles)(Scream);
export default connect(mapStateToProps, mapActionsToProps)(Scream)
// export default (Scream)
