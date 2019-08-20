import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import AuthProvider from '../../providers/authProvider';

const WithoutAuth = WrappedComponent => {
	@inject('user')
	@observer
	class WithoutAuth extends Component {
		render() {
			var isAuthenticated = this.props.user.isAuthenticated;
			return isAuthenticated ? <Redirect to="/" /> : <WrappedComponent {...this.props} />;
		}
	}
	return WithoutAuth;
};

export default WithoutAuth;
