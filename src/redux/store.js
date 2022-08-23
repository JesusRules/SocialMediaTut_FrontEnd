import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});


const persistConfig = {
    key: 'primary',
    storage
}
const persistedReducer = persistReducer(persistConfig,reducers);


const store = createStore(
    persistedReducer,
    initialState, 
    compose(applyMiddleware(...middleware), 
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
);
const persistor = persistStore(store);

export {persistor};
export default store;