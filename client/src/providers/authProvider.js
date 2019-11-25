import { post } from './apiProvider';
import ConnectionStrings from '../constants/conStrings';
import axios from 'axios';

function setAuthToken({ accessToken, refreshToken, expiresDate }) {
	if (accessToken) {
		localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('expiresDate', expiresDate);
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		return;
	}

	delete axios.defaults.headers.common['Authorization'];
	localStorage.removeItem('refreshToken');
	localStorage.setItem('expiresDate', expiresDate);
}

const signinWrapper = callback => {
	return res => {
		const tokenData = res.data;
		setAuthToken(tokenData);
		callback(tokenData);
	};
};

export function getRefreshToken() {
	return localStorage.getItem('refreshToken');
}

export function tokenExpired() {
	var expiresDate = localStorage.getItem('expiresDate');
	return expiresDate < new Date();
}

export const signin = (model, hookCallback) => {
	post(`${ConnectionStrings.AuthApiUrl}/signin`, model, signinWrapper(hookCallback));
};

export const signup = (model, hookCallback) => {
	post(`${ConnectionStrings.AuthApiUrl}/signup`, model, signinWrapper(hookCallback));
};

export const logout = hookCallback => {
	var emptyTokenData = {};
	setAuthToken(emptyTokenData);
	hookCallback(emptyTokenData);
};

export const refreshToken = hookCallback => {
	const token = getRefreshToken();
	const isExpired = tokenExpired();
	if (token && !isExpired) {
		post(`${ConnectionStrings.AuthApiUrl}/refresh-token`, { refreshToken: token }, signinWrapper(hookCallback));
		return;
	}
	const emptyTokenData = {};
	setAuthToken(emptyTokenData);
};
