import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import DeleteComment from './DeleteComment';
// MUI
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { deleteScream, getScream, deleteComment } from '../../redux/actions/dataActions.js'
import MyButton from '../../util/MyButton.js';
// MUI Stuff
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DeleteOutline from '@mui/icons-material/DeleteOutline'; //icon

const styles = {
    //NO GLOBAL THEME
    // ...theme
    invisibleSeparator: { //USE IN COMMENTS 10:05
        border: 'none',
        margin: 4,
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    commentImage: {
        position: 'absolute',
        // paddingTop: 8,
        width: 47,
        height: 47,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 26,

        transform: 'translateY(-10.6px)',
    },
    nameTag: {
        position: 'relative',
        left: 70,
        top: -12,
        // marginBottom: '.5rem',
        width: 210,
        // backgroundColor: 'red',
        paddingTop: '.6rem',
    },

    commentData: {
        marginLeft: 15.3,
        paddingBottom: 0,
        fontSize: 16,
    },
    body: {
        paddingLeft: '.33rem',
        paddingBottom: '0.27rem',
    },
    deleteButton: {
        position: 'relative',
        left: '0%',
        transform: 'translateY(-3px)',
    }
}


class Comments extends Component{
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteComment2 = (commentId, screamId) => {
        // ev.preventDefault();
        console.log("CommentID: " + commentId);
        // let index = this.props.comments.findIndex((comment) => comment.commentId === commentId);
        // this.props.comments.splice(index, 1);
        this.props.deleteComment(commentId, screamId);
        this.setState({ open: false });
    }
    callCommentsSplice = (commentId, screamId) => {
        setTimeout(() => {
            // let index = this.props.comments.findIndex((comment) => comment.commentId === commentId);
            // this.props.comments.splice(index, 1);
            this.props.getScream(this.props.screamId);
            }, 550);
    }

    render() {
        let { comments } = this.props;
        const { user: { authenticated, credentials: { handle} }} = this.props;


        let newString = '';

        if (comments) {

            return (
                <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle, commentId} = comment;
                
                if (body) {
                    newString = body.replace(/(.{28})/g, "$1<br/>");
                }   

                //Get comment stuff from map array comments
                const deleteButton = authenticated && userHandle === handle ? (
                    <DeleteComment callCommentsSplice={this.callCommentsSplice} commentId={commentId} screamId={this.props.screamId}/>
                //     <Fragment>
                //     <MyButton tip="Delete Comment" onClick={this.handleOpen} style={styles.deleteButton}>
                //         <DeleteOutline color="secondary"/>
                //     </MyButton>
                //     <Dialog
                //         open={this.state.open}
                //         onClose={this.handleClose}
                //         fullWidth
                //         maxWidth="sm">
                //     <DialogTitle>
                //         Are you sure you want to delete this comment ?
                //         <DialogActions>
                //             <Button onClick={this.handleClose} color="primary">Cancel</Button>
                //             <Button onClick={ () => this.deleteComment2(commentId, this.props.screamId) } color="secondary">Delete</Button>
                //             {/* <Button onClick={this.deleteComment2(commentId, this.props.screamId)} color="secondary">Delete</Button> */}
                //         </DialogActions>
                //     </DialogTitle>
                //     </Dialog>
                // </Fragment>
                  ) : null

                  //DELETE COMMENT ALTERNATE 2 TEST
                //   const deleteComment = () => {
                //     let index = comments.findIndex((comment) => comment.commentId === commentId);
                //     comments.splice(index, 1);
                //     this.props.deleteComment(this.props.commentId);
                //     this.setState({ });
                //     // return {
                //     //     ...state
                //     // };
                // }

                return (
                    <Fragment key={createdAt}>
                        <Grid item>
                            <Grid container>
                                <Grid item >
                                    <img src={userImage} alt="comment" style={styles.commentImage}/>
                                </Grid>                              
                                <Grid item >
                                    <div style={styles.commentData}>
                                    <div style={styles.nameTag}>
                                        <Typography style={{fontSize: 19}}
                                            variant="h5" 
                                            component={Link} 
                                            to={`/user/${userHandle}`}
                                            color="primary">
                                                {userHandle}
                                            </Typography>

                                            {deleteButton}

                                        <Typography 
                                        style={{fontSize: 13, fontStyle: 'italic'}} variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                    </div>
                                    <div style={styles.body}>
                                        <hr style={styles.invisibleSeparator}/>
                                        <Typography style={{fontSize: 17}} variant="body1">
                                        {/* {newString.split("<br/>").join("\n")} */}
                                        {body}
                                        </Typography>
                                    </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* {index !== comments.length -1 && (
                            <hr style={styles.visibleSeparator}/>
                        )} */}
                            <hr style={styles.visibleSeparator}/>
                    </Fragment>
                )
            })}
        </Grid>    
        )
    }
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    // data: state.data,
  })

Comments.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    // user: PropTypes.object.isRequired,
    // commentId: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, {deleteComment, getScream})(Comments);
// export default Comments;