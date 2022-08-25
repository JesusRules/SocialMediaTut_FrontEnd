import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, 
    DELETE_SCREAM, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, POST_SCREAM, SET_SCREAM,
    STOP_LOADING_UI, SUBMIT_COMMENT, JUST_RETURN, UPDATE_COMMENT_COUNT } from '../types';
import axios from 'axios'
import { RssFeed } from '@mui/icons-material';

// Get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('https://us-central1-socialape-14d54.cloudfunctions.net/api/screams')
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    })
}

export const getScream = (screamId) => (dispatch) => {
    dispatch( { type: LOADING_UI });
    axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${screamId}`)
    .then(res => {
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
}

// Post a scream
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream`, newScream)
    .then(res => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
    axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${screamId}/like`)
    .then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${screamId}/unlike`)
    .then(res => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

//Submit a comment
export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${screamId}/comment`, commentData)
    .then(res => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//Submit a comment
export const submitComment2 = (screamId, commentData) => (dispatch) => {
    axios.post(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${screamId}/comment`, commentData)
    .then(res => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        // dispatch({
        //     type: UNLIKE_SCREAM,
        //     payload: res.data.screamData
        // });
        dispatch(clearErrors());
        // dispatch(justReturn());
        
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

// Delete a scream
export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${screamId}`)
    .then(() => {
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        })
    })
    .catch(err => console.log(err));
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/user/${userHandle}`)
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        });
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })
    })
}

// UPDATE COMMENT COUNT
export const updateCount = (screamId) => (dispatch) => {
    axios.get(`https://us-central1-socialape-14d54.cloudfunctions.net/api/scream/${screamId}/updateCount`)
    .then(res => {
        dispatch({
            type: UPDATE_COMMENT_COUNT,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}


export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
export const justReturn = () => (dispatch) => {
    dispatch({ type: JUST_RETURN });
}