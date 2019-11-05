import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const WithoutAuth = WrappedComponent => {
	class WithoutAuth extends Component {
		render() {
			var isAuthenticated = this.props.auth.isAuthenticated;
			return isAuthenticated ? <Redirect to="/" /> : <WrappedComponent {...this.props} />;
		}
	}
	return WithoutAuth;
};

export default WithoutAuth;
