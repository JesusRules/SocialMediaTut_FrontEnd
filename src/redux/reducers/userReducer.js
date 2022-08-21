import { switchClasses } from '@mui/material';
import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types.js';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function(state = initialState, action){
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState; //authenticated at false and no data
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            };
        default:
            return state;
    }
}