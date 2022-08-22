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
        maxWidth: '100%',
        height: 90,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 120
    },
    commentData: {
        marginLeft: 120,
        
    }
}

class Comments extends Component{
    render() {
        const { classes, comments } = this.props;
        return (
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle} = comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="comment" style={styles.commentImage}/>
                                </Grid>                              
                                <Grid item sm={9}>
                                    <div style={styles.commentData}>
                                        <Typography
                                            variant="h5" 
                                            component={Link} 
                                            to={`/users/${userHandle}`}
                                            color="primary">
                                                {userHandle}
                                            </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr style={styles.invisibleSeparator}/>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length -1 && (
                            <hr style={styles.visibleSeparator}/>
                        )}
                    </Fragment>
                )
            })}
        </Grid>    
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default Comments;