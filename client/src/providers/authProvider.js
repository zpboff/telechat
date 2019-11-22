import ApiProvider from './apiProvider';
import ConnectionStrings from '../constants/conStrings';
import axios from 'axios';

export const setAuthToken = ({ accessToken, refreshToken, expiresIn }) => {
	if (accessToken) {
		localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('expiresIn', expiresIn);
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		return;
	}

	delete axios.defaults.headers.common['Authorization'];
	localStorage.removeItem('refreshToken');
	localStorage.setItem('expiresIn', expiresIn);
};

export const getRefreshToken = () => {
	return localStorage.getItem('refreshToken');
};

export const signin = (model, hookCallback) => {
	var existedToken = getRefreshToken();

	if (!existedToken) {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin`, model, res => {
			const tokenData = res.data;
			setAuthToken(tokenData);
			hookCallback(tokenData);
		});
	}
	
	hookCallback(existedToken);
};

export const signup = (model, callback) => {
	ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signup`, model, res => {
		const { token } = res.data;
		setAuthToken(token);
		callback(token);
	});
};

export const signinAsUser = (email, callback) => {
	ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin-as-user`, { email }, res => {
		const { token } = res.data;
		setAuthToken(token);
		callback(token);
	});
};
