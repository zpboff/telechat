import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const WithAuth = WrappedComponent => {
	class WithAuth extends Component {
		render() {
			var isAuthenticated = this.props.auth.isAuthenticated;
			return isAuthenticated ? <WrappedComponent {...this.props} /> : <Redirect to="/signin" />;
		}
	}
	return WithAuth;
};

export default WithAuth;
