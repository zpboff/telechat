import { signinAction } from './actions';
import jwtDecode from 'jwt-decode';

export const authReducer = (state, action) => {
	switch (action.type) {
		case signinAction:
			const { accessToken } = action;
			const isAuthenticated = !!accessToken;
			const user = isAuthenticated ? jwtDecode(accessToken) : {};

			return {
				user,
				accessToken,
			};
		default:
			return state;
	}
};
