import { combineReducers } from 'redux'
import chatReducer from './chatReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    users: usersReducer
});

export default rootReducer