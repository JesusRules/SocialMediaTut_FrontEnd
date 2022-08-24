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
import { getScream, clearErrors } from '../../redux/actions/dataActions.js'

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
        // maxWidth: 200,
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    dialogContent: {
        padding: 20,
        "@media (minWidth: 10100px)": {
            color: 'red',
        },
    },
    closeButton: {
        position: 'absolute',
        // top: '2.5%',
        // right: '2.5%',
        left: '91%',
        top: '3%'
        // cursor:'pointer'
        
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
    }
}

class ScreamDialog extends Component{
    state = {
        open: false,
        oldPath: '',
        newPath: '',
        // matches: window.matchMedia("(max-width: 500px)").matches,

    }
    componentDidMount() {
        if(this.props.openDialog){ //if exists from Scream, from user page
            this.handleOpen();
        }
        // const handler = e => this.setState({matches: e.matches});
        // window.matchMedia()
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
        window.history.pushState(null, null, this.state.oldPath);
        // window.location = this.state.oldPath;
        this.props.clearErrors();
        this.setState({ open: false })
    }

    render() {
    const { scream: { screamId, body, createdAt, likeCount, 
        commentCount, userImage, userHandle, comments }, UI: { loading }} = this.props;

    const dialogMarkup = loading ? (
            <div style={styles.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
    ) : (
        <Grid container spacing={0}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" style={styles.profileImage}/>
            </Grid>
            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/user/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr style={styles.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr style={styles.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                <MyButton tip="Comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                    <span>{commentCount} Comments</span>
            </Grid>
            <hr style={styles.visibleSeparator}/>
            <CommentForm screamId={screamId} />
            <Comments comments={comments}/>
        </Grid>
    )
    return (
        <Fragment>

            <MyButton onClick={this.handleOpen} tip="Expand bark" style={styles.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>

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
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(ScreamDialog);