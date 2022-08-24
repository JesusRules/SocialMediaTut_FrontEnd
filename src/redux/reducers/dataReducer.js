import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, 
    LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM,
    SUBMIT_COMMENT } from '../types.js'

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,

            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;//likeCount++
            if (state.scream.screamId === action.payload.screamId){
                state.scream = action.payload;
            }
            return {
                ...state,
                
            };
        case DELETE_SCREAM:
            let index2 = state.screams.findIndex((scream) => scream.screamId === action.payload);
            state.screams.splice(index2, 1); //starts at index (0? 1? 2?) then cuts 1 after
            return {
                ...state
            };
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload, //adding to the top (newScream)
                    ...state.screams //rest of screams
                ]
            };
        case SUBMIT_COMMENT:
            state.scream.commentCount++;
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload.newComment, ...state.scream.comments]
                    // comments: [action.payload, ...state.scream.comments]
                }
            };
        default:
            return state;

    }
}