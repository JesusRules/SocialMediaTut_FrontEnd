import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// import withStyles from 'asd'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
// MUI
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
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
        width: 69,
        height: 69,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 18
    },
    commentData: {
        marginLeft: 15.3,
        paddingBottom: 5,
        fontSize: 18,
        
    }
}

class Comments extends Component{
    // state = {
    //     profile: null,
    //     screamIdParam: null,
    //     hideNav: false,
    //     handle: '',
    // };

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

    render() {
        const { comments } = this.props;
        return (
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle} = comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item>
                            <Grid container>
                                <Grid item >
                                    <img src={userImage} alt="comment" style={styles.commentImage}/>
                                </Grid>                              
                                <Grid item >
                                    <div style={styles.commentData}>
                                        <Typography
                                            variant="h5" 
                                            component={Link} 
                                            to={`/user/${userHandle}`}
                                            color="primary">
                                                {userHandle}
                                            </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr style={styles.invisibleSeparator}/>
                                        <Typography style={{fontSize: 18}} variant="body1">
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