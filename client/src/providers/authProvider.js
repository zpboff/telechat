import ApiProvider from './apiProvider';
import ConnectionStrings from '../constants/conStrings';
import axios from 'axios';

export default class AuthProvider {
	static SetAuthToken = token => {
		if (token) {
			sessionStorage.setItem('token', token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			return;
		}
		delete axios.defaults.headers.common['Authorization'];
		sessionStorage.removeItem('token');
	};

	static GetAuthToken = () => {
		return sessionStorage.getItem('token');
	};

	static Signin = (model, callback) => {
		var existedToken = AuthProvider.GetAuthToken();
		if (!existedToken) {
			ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin`, model, res => {
				const { token } = res.data;
				AuthProvider.SetAuthToken(token);
				callback(token);
			});
		} else {
			callback(existedToken);
		}
	};

	static Signup = (model, callback) => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signup`, model, res => {
			const { token } = res.data;
			AuthProvider.SetAuthToken(token);
			callback(token);
		});
	};

	static SigninAsUser = (email, callback) => {
		ApiProvider.Post(`${ConnectionStrings.AuthApiUrl}/signin-as-user`, { email }, res => {
			const { token } = res.data;
			AuthProvider.SetAuthToken(token);
			callback(token);
		});
	};
}
