import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
// MUI
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//test icon
import TestIcon from '../../images/pokes4.png'
import axios from 'axios';

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
        paddingTop: 8,
        width: 57,
        height: 57,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 20,
        // display: 'inline',
    },
    commentData: {
        marginLeft: 17.3,
        paddingBottom: 5,
        fontSize: 18,
    },
    commenterInfo: {
        position: 'relative',
        bottom: '3.4rem',
        left: '4.6rem',
        width: 350,
        // backgroundColor: 'red',
    },
    message: {
        fontSize: 17,
        position: 'relative',
        bottom: '2.6rem',
    }
}

class Comments extends Component{
    state = {
        commentHandle: '',
    };

    // componentDidMount() {
        
    //     this.props.getUserData(handle); //loads
    //     axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/user/${handle}`)
    //     .then(res => {
    //         this.setState({
    //             handle: res.data.user.handle,
    //             profile: res.data.user //profile is static - doesnt needd to be in state
    //         })
    //     })
    //     .catch(err => console.log(err));
    // }
    pushToUserDetail = () => {
        window.location.href = `/user/${this.commentHandle}`;
    }

    
    render() {
        const { comments } = this.props;
        let newString;
        return (
            <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle} = comment;
                newString = body.replace(/(.{19})/g, "$1<br/>");
                // this.setState({commentHandle: userHandle});
                return (
                    <Fragment key={createdAt}>
                        <Grid item>
                            <Grid container>
                                <Grid item >
                                    <img src={userImage} alt="comment" style={styles.commentImage}/>
                                </Grid>                              
                                <Grid item >
                                    <div style={styles.commentData}>
                                        
                                        <div style={styles.commenterInfo}>
                                        <a href={`/user/${userHandle}`}>
                                        <Typography style={{fontSize: 19}}
                                            variant="h5" 
                                            color="primary">
                                                {userHandle}
                                            </Typography>
                                        </a>
                                        <Typography style={{fontSize: 11}} variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        </div>
                                        
                                        <hr style={styles.invisibleSeparator}/>
                                        <Typography style={styles.message} variant="body1">
                                            {/* {body} */}
                                            {newString.split("<br/>").join("\n")}
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

// user.propTypes = {
//     getUserData: PropTypes.func.isRequired,
//     data: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     data: state.data,
//     authenticated: state.user.authenticated,
// })

// export default connect(mapStateToProps, {})(Comments);
export default (Comments);