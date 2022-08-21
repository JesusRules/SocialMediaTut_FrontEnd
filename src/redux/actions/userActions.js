import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types.js';
import {Navigate, useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router'

export const loginUser = (userData, history) => (dispatch) => {
    // const navigate = useNavigate();

    dispatch( {type: LOADING_UI});
    axios.post('https://us-central1-socialape-14d54.cloudfunctions.net/api/login', userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
    //   <Navigate to="/" replace={true} />
    //   history.push('/');
    // navigate('/');
    // window.history.pushState('/');

    window.setTimeout(function() {
          window.location.href = '/';
    }, 500);
      
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    });
}

export const getUserData = () => (dispatch) => {
    axios.get('https://us-central1-socialape-14d54.cloudfunctions.net/api/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}