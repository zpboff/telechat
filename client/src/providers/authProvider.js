import ApiProvider from './apiProvider';
import ConnectionStrings from '../constants/conStrings';
import axios from 'axios';

export default class AuthProvider {
	static SetAuthToken = token => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = token;
			return;
		}
		delete axios.defaults.headers.common['Authorization'];
	};

	static Signin = (model, callback) => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin`, model, res => {
			AuthProvider.SetAuthToken(res.data.user.token);
			callback(res.data.user);
		});
	};

	static Signup = (model, callback) => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signup`, model, res => {
			AuthProvider.SetAuthToken(res.data.user.token);
			callback(res.data.user);
		});
	};

	static SigninAsUser = (email, callback) => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin-as-user`, { email }, res => {
			AuthProvider.SetAuthToken(res.data.user.token);
			callback(res.data.user);
		});
	};
}
