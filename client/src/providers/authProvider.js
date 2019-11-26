import { post } from './apiProvider';
import ConnectionStrings from '../constants/conStrings';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


function setAuthToken({ accessToken, refreshToken, expiresDate }) {
	if (accessToken) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('expiresDate', expiresDate);
		sessionStorage.setItem('accessToken', accessToken);
		return;
	}

	delete axios.defaults.headers.common['Authorization'];
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('expiresDate');
	sessionStorage.removeItem('accessToken');
}

function signinWrapper(callback) {
	return function(res) {
		const tokenData = res.data;
		setAuthToken(tokenData);
		callback(tokenData);
	};
}

export function getRefreshToken() {
	return localStorage.getItem('refreshToken');
}

export function getCurrentTokenData() {
	const accessToken = sessionStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	const expiresDate = localStorage.getItem('expiresDate');

	return {
		accessToken,
		refreshToken,
		expiresDate,
	};
}

export function tokenExpired() {
	var expiresDate = localStorage.getItem('expiresDate');
	return expiresDate < new Date();
}

export function signin(model, hookCallback) {
	post(`${ConnectionStrings.AuthApiUrl}/signin`, model, signinWrapper(hookCallback));
}

export function signup(model, hookCallback) {
	post(`${ConnectionStrings.AuthApiUrl}/signup`, model, signinWrapper(hookCallback));
}

export function logout(hookCallback) {
	var emptyTokenData = {};
	setAuthToken(emptyTokenData);
	hookCallback(emptyTokenData);
}

export function getPayload(accessToken){
	const { payload } = jwtDecode(accessToken)
	return payload;
}

export function refreshToken(hookCallback) {
	const token = getRefreshToken();
	const isExpired = tokenExpired();
	const tokenData = getCurrentTokenData();

	if (!token) {
		const emptyTokenData = {};
		setAuthToken(emptyTokenData);
		hookCallback(emptyTokenData);
		return;
	}

	if (isExpired || !tokenData.accessToken) {
		post(`${ConnectionStrings.AuthApiUrl}/refresh-token`, { refreshToken: token }, signinWrapper(hookCallback));
		return;
	}

	setAuthToken(tokenData);
	hookCallback(tokenData);
}
