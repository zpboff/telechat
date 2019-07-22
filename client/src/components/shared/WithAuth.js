import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProvider from '../../providers/authProvider';

const WithAuth = WrappedComponent => {
	class WithAuth extends Component {
		render() {
			var existedToken = AuthProvider.GetAuthToken();
			return existedToken ? <WrappedComponent {...this.props} /> : <Redirect to="/target" />;
		}
	}
	return WithAuth;
};

export default WithAuth;
