import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import MyButton from '../../util/MyButton.js'
import LikeButton from './LikeButton.js'
import Comments from './Comments.js';
import CommentForm from './CommentForm.js';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
// MUI Stuff
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
// Icons
import CloseIcon from '@mui/icons-material/Close';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
import ChatIcon from '@mui/icons-material/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { likeScream, getScreams, getScream, clearErrors } from '../../redux/actions/dataActions.js'
import {styled} from '@mui/material/styles';
import { createTheme, ThemeProvider, Box } from '@mui/system';

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



const styles = {
    //THEME!!!
    // palette: {
    //     primary: {
    //     light: '#33c9dc',
    //     main: '#00bcd4',
    //     dark: '#008394',
    //     contrastText: '#fff'
    //     },
    //     secondary: {
    //     light: "#ff6333",
    //     main: '#ff3d00',
    //     dark: '#b22a00',
    //     contrastText: '#fff'
    //     },
    // },
    // typography: {
    //     useNextVariants: true
    // },
    // form: {
    //     textAlign: 'center',
    // },
    // image: {
    //     margin: '20px auto 20px auto',
    // },
    // pageTitle: {
    //     margin: '10px auto 10px auto'
    // },
    // textField: {
    //     margin: '10px auto 10px auto'
    // },
    // button: {
    //     marginTop: 20,
    //     position: 'relative'
    // },
    // customError: {
    //     color: 'red',
    //     fontSize: '0.8rem',
    //     marginTop: 10
    // },
    // progress: {
    //     position: 'absolute'
    // },
    //NEW
    invisibleSeparator: { //USE IN COMMENTS 10:05
        border: 'none',
        margin: 4,
    },
    visibleSeparator: {
        width: '100%',
        // borderBottom: '1px solid rgba(0,0,0,0.1)',
        border: 'none',
        marginBottom: 20
    },


    profileImage: {
        // width: 200,
        // height: 200,
        borderRadius: '50%',
        objectFit: 'cover',
        position: 'relative',
        bottom: '2rem',
    },
    dialogContent: {
        padding: 20,
        "@media (minWidth: 10100px)": {
            color: 'red',
        },
    },
    closeButton: {
        // position: 'absolute',
        // right: 0,
        // marginRight: '.9rem',
        // top: '3%',
        
    },
    expandButton: {
        position: 'absolute',
        left: '90%',
        bottom: '10%',
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },


    details: {
        paddingTop: '1rem',
        position: 'relative',
        right: -10,
    },
    infoGrid: {
        position: 'relative',
        right: 10,
    },
    screamCommentStuff: {
        position: 'relative',
        bottom: 80,
        right: 25,
    },
    commentAndForm: {
        position: 'relative',
        bottom: 70,
    },
    createdAt: {
        fontStyle: 'italic',
        transform: 'translate(5px, -5px)'
    }
}


const CardImgStyle = styled('img')({
    width: 110,
    height: 110,
    paddingRight: '.8rem',

    [theme.breakpoints.down('545')]: {
        // position: "relative",
        // transform: "translate(0%, 0%)",
        // paddingRight: '0',
        // width: 60,
        // height: 60,
    },
    [theme.breakpoints.down('440')]: {
        width: 77,
        height: 77,
    }
  });

const TitleNameStyle = styled('div')({
    position: 'relative',
    bottom: 130,
    left: 122,
    // backgroundColor: 'red',
    width: 320,
    margin: 0,

    [theme.breakpoints.down('500')]: {
        width: 230,
    },
    [theme.breakpoints.down('440')]: {
        width: 200,
        bottom: 110,
        left: 82,
        fontSize: 10
    }
})       


class ScreamDialog extends Component{
    state = {
        open: false,
        oldPath: '',
        newPath: '',
        commentButton2: false,
        // matches: window.matchMedia("(max-width: 500px)").matches,

    }
    componentDidMount() {
        if(this.props.openDialog){ //if exists from Scream, from user page
            this.handleOpen();
        }
        // const handler = e => this.setState({matches: e.matches});
        // window.matchMedia()
    }
    componentDidUpdate() {
        // console.log(Child32());
        // this.props.getScream(this.props.screamId);
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;
        const newPath = `/user/${userHandle}/scream/${screamId}`;

        if (oldPath === newPath) oldPath = `/user/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath })
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {

        this.props.getScreams();
        window.history.pushState(null, null, this.state.oldPath);
        this.props.clearErrors();
        this.setState({ open: false })
        // setTimeout(() => this.props.getScream(this.props.screamId), 1000);
    }

    render() {
    const { scream: { screamId, body, createdAt, likeCount, 
        commentCount, userImage, userHandle, comments }, UI: { loading }} = this.props;

    let newString = '';
    if (body) {
        newString = body.replace(/(.{28})/g, "$1<br/>");
    }

    const dialogMarkup = loading ? (
            <div style={styles.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
    ) : (
        <Grid container style={{marginTop:'0rem'}} spacing={3}>
            {/* <Grid item sm={5}> */}
            <Grid item>
                {/* <img src={userImage} alt="Profile" style={styles.profileImage}/> */}
            </Grid>
            {/* <Grid item sm={7}> */}
            <Grid  style={styles.infoGrid} item>
            <div>
                <CardImgStyle src={userImage} alt="Profile" style={styles.profileImage}/>
                
                <TitleNameStyle>
                <Typography style={{fontSize: 21}}
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/user/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr style={styles.invisibleSeparator}/>

                    <Typography variant="body2" color="textSecondary" style={styles.createdAt}>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                </TitleNameStyle>
                   
                <div style={styles.screamCommentStuff}>
                    <hr style={styles.invisibleSeparator}/>
                   
                    <Typography style={{paddingLeft: '1.6rem', fontSize: 18}} variant="body1">
                        {/* {body} */}
                        {newString.split("<br/>").join("\n")}
                    </Typography>

                    <div style={styles.details}>
                    <LikeButton screamId={this.props.screamId}/>
                    <span>{likeCount} Likes</span>
                <MyButton tip="Comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                    <span>{commentCount} Comments</span>
                    </div>
                    </div>
                    </div>
            </Grid>
        <div style={styles.commentAndForm}>
            <hr style={styles.visibleSeparator}/>
        <div style={{paddingLeft: '1.3rem'}}><CommentForm screamCommentCount={52} screamId={screamId}/></div>
            <Comments comments={comments}/>
        </div>
        </Grid>
    )
    return (
        <Fragment>
            
            {!this.props.commentButton && (
            <MyButton onClick={this.handleOpen} tip="Expand bark" style={styles.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>
            )}
            
            {this.props.commentButton && (
               <MyButton onClick={this.handleOpen} tip="Comments">
              <ChatIcon  color="primary"/>
            </MyButton>
            )}
            

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
            <MyButton tip="Close" onClick={this.handleClose} style={styles.closeButton}>
            <CloseIcon/>
            </MyButton>
            {/* <DialogActions>
            <Button onClick={this.handleClose} style={styles.closeButton}>
              <CloseIcon/>Close
            </Button>
            </DialogActions> */}
        {/* </Tooltip> */}

            <DialogContent style={styles.dialogContent}>
                {dialogMarkup}
            </DialogContent>
            </Dialog>

        </Fragment>
    )
   }
}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,

    //test
    likeScream: PropTypes.func.isRequired,
    getScreams: PropTypes.func.isRequired,


    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI,
    
})

const mapActionsToProps = {
    getScream,
    clearErrors,
    //test
    likeScream,
    getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(ScreamDialog);