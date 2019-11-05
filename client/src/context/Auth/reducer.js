import { Signin, SetToken } from './actions';

export const authReducer = (state, action) => {
	switch (action.type) {
		case SetToken:
			return {
				...state,
				token: action.token,
			}
		case Signin:
			return {
				isAuthenticated: !!action.token,
				user: action.user,
				token: action.token,
			}
		default:
			return state;
	}
};
