import { UsersActions } from '../constants/actions';

const initialState = {
	errors: {},
	topUsers: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case UsersActions.SET_TOP_USERS:
			return {
				...state,
				topUsers: action.users
			};
		case UsersActions.SET_ERRORS:
			return {
				...state,
				errors: action.errors
			};
		default:
			return state;
	}
};
