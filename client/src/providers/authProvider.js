import ApiProvider from './apiProvider';
import ConnectionStrings from '../constants/conStrings';
import axios from 'axios';

const setAuthToken = ({ accessToken, refreshToken, expiresDate }) => {
	if (accessToken) {
		localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('expiresDate', expiresDate);
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		return;
	}

	delete axios.defaults.headers.common['Authorization'];
	localStorage.removeItem('refreshToken');
	localStorage.setItem('expiresDate', expiresDate);
};

const signinWrapper = callback => {
	return res => {
		const tokenData = res.data;
		setAuthToken(tokenData);
		callback(tokenData);
	};
};


export const getRefreshToken = () => {
	return localStorage.getItem('refreshToken');
};

export const signin = (model, hookCallback) => {
	var existedToken = getRefreshToken();

	if (!existedToken) {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin`, model, signinWrapper(hookCallback));
		return;
	}

	hookCallback(existedToken);
};

export const signup = (model, hookCallback) => {
	ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signup`, model, signinWrapper(hookCallback));
};

export const signinAsUser = (email, hookCallback) => {
	ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin-as-user`, { email }, signinWrapper(hookCallback));
};