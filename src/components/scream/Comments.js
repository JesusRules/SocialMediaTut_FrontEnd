import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
// MUI
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

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
        paddingTop: 8,
        width: 47,
        height: 47,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 26,

        transform: 'translateY(-17px)',
    },
    nameTag: {
        position: 'relative',
        left: 70,
        top: -12,
        // marginBottom: '.5rem',
        width: 300,
        paddingTop: '.6rem',
    },

    commentData: {
        marginLeft: 15.3,
        paddingBottom: 0,
        fontSize: 16,
    },
    body: {
        paddingLeft: '2.2rem',
        paddingBottom: '0.27rem',
    }
}

class Comments extends Component{
    render() {
        const { comments } = this.props;

        let newString = '';

        if (comments) {

            return (
                <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle} = comment;
                
                if (body) {
                    newString = body.replace(/(.{28})/g, "$1<br/>");
                }   
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
                                        <Typography 
                                        style={{fontSize: 13, fontStyle: 'italic'}} variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                    </div>
                                    <div style={styles.body}>
                                        <hr style={styles.invisibleSeparator}/>
                                        <Typography style={{fontSize: 17}} variant="body1">
                                        {newString.split("<br/>").join("\n")}
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

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default Comments;