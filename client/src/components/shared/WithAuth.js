import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProvider from '../../providers/authProvider';
import { observer } from 'mobx-react';

const WithAuth = WrappedComponent => {
	@observer
	class WithAuth extends Component {
		render() {
			var existedToken = AuthProvider.GetAuthToken();
			var isAuthenticated = this.props.auth.isAuthenticated;
			return existedToken || isAuthenticated ? <WrappedComponent {...this.props} /> : <Redirect to="/signin" />;
		}
	}
	return WithAuth;
};

export default WithAuth;
