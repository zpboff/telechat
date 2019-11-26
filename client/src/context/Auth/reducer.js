import { signinAction } from './actions';
import { getPayload } from '../../providers/authProvider';

export const authReducer = (state, action) => {
	switch (action.type) {
		case signinAction:
			const { accessToken } = action.payload;
			const isAuthenticated = !!accessToken;
			const { payload } = isAuthenticated ? getPayload(accessToken) : {};

			return {
				user: payload,
				accessToken,
			};
		default:
			return state;
	}
};
