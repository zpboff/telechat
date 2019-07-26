import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import AuthProvider from '../../providers/authProvider';

const WithoutAuth = WrappedComponent => {
	@observer
	class WithoutAuth extends Component {
		render() {
			var existedToken = AuthProvider.GetAuthToken();
			var isAuthenticated = this.props.auth.isAuthenticated;
			return existedToken || isAuthenticated ? <Redirect to="/" /> : <WrappedComponent {...this.props} />;
		}
	}
	return WithoutAuth;
};

export default WithoutAuth;
