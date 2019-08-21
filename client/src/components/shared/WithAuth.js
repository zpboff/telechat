import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const WithAuth = WrappedComponent => {
	@inject('auth')
	@observer
	class WithAuth extends Component {
		render() {
			var isAuthenticated = this.props.auth.isAuthenticated;
			return isAuthenticated ? <WrappedComponent {...this.props} /> : <Redirect to="/signin" />;
		}
	}
	return WithAuth;
};

export default WithAuth;
