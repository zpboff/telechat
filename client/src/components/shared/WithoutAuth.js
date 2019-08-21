import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

const WithoutAuth = WrappedComponent => {
	@inject('auth')
	@observer
	class WithoutAuth extends Component {
		render() {
			var isAuthenticated = this.props.auth.isAuthenticated;
			return isAuthenticated ? <Redirect to="/" /> : <WrappedComponent {...this.props} />;
		}
	}
	return WithoutAuth;
};

export default WithoutAuth;
