import { getCurrentTokenData, tokenExpired, getPayload } from '../../providers/authProvider';

export function getDefautAuthState() {
	const { accessToken, refreshToken } = getCurrentTokenData();
	const isExpired = tokenExpired();

	if (!refreshToken || isExpired) {
		return {
			accessToken: null,
			user: {},
		};
	}

	const { payload } = getPayload(accessToken);

	return {
		accessToken: accessToken,
		user: payload,
	};
}
