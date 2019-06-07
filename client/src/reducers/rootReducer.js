import { combineReducers } from 'redux'
import chatReducer from './chatReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer
});

export default rootReducer