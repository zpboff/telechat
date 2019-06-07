import axios from 'axios';

export default class AuthProvider {
	static SetAuthToken = (token) => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = token;
			return;
		}
		delete axios.defaults.headers.common['Authorization'];
	};
}
