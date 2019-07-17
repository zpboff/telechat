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

	static Signin = model => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin`, model, res => {
			console.log(res);
		});
	};

	static Signup = model => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signup`, model, res => {
			console.log(res);
		});
	};

	static SigninAsUser = email => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin-as-user`, { email }, res => {
			console.log(res);
		});
	};
}
