import { switchClasses } from '@mui/material';
import { startTransition } from 'react';
import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAM,
        UNLIKE_SCREAM, 
        MARK_NOTIFICATIONS_READ} from '../types.js';

const initialState = {
    authenticated: false,
    loading: false,
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
        
        case SET_USER: //Sets the profile
            return {
                authenticated: true,
                loading: false,
                ...action.payload // /user/ data
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter((like) => like.screamId !== action.payload.screamId) //keeps
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notification => notification.read = true);
            return {
                ...state
            }
        default:
            return state;
    }
}