import { signinAction } from './actions';
import jwtDecode from 'jwt-decode';

export const authReducer = (state, action) => {
	switch (action.type) {
		case signinAction:
			const { accessToken } = action.payload;
			const isAuthenticated = !!accessToken;
			const { payload } = isAuthenticated ? jwtDecode(accessToken) : {};

			return {
				user: payload,
				accessToken,
			};
		default:
			return state;
	}
};
