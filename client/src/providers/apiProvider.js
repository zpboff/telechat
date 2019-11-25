import axios from 'axios';
import { tokenExpired, getRefreshToken } from './authProvider';
import ConnectionStrings from '../constants/conStrings';

const logError = error => {
	console.log(`%c ${error}`, 'background: #222; color: #bada55');
};

export async function get(url, callback) {
	try {
		var res = await axios.get(url);
		if (res.status === 200) {
			callback(res);
			return;
		}
		logError(res);
	} catch (ex) {
		logError(ex);
	}
}

export async function post(url, body, callback) {
	try {
		var res = await axios.post(url, body);
		if (res.status === 200) {
			callback(res);
			return;
		}
		logError(res);
	} catch (ex) {
		logError(ex);
	}
}

export async function getWithRefresh(url, callback) {
	const isExpires = tokenExpired();

	if (isExpires) {
		const refreshToken = getRefreshToken();
		await post(
			`${ConnectionStrings.AuthApiUrl}/refresh-token`,
			{ refreshToken },
			async () => await get(url, callback)
		);
		return;
	}

	await get(url, callback);
}

export async function postWithRefresh(url, body, callback) {
	const isExpires = tokenExpired();

	if (isExpires) {
		const refreshToken = getRefreshToken();
		await post(
			`${ConnectionStrings.AuthApiUrl}/refresh-token`,
			{ refreshToken },
			async () => await post(url, body, callback)
		);
		return;
	}

	await post(url, body, callback);
}