import { AuthActions } from '../constants/actions';
import ValidationHelper from '../helpers/validation'

export default (state = {}, action) => {
	switch (action.type) {
		case AuthActions.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !ValidationHelper.IsEmpty(action.payload),
				user: action.payload
			};
		case AuthActions.SET_ERRORS:
			return {
				...state,
				errors: action.errors
			};
		default:
			return state;
	}
};