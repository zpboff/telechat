import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import AuthProvider from '../../providers/authProvider';

const WithoutAuth = WrappedComponent => {
	@inject('user')
	@observer
	class WithoutAuth extends Component {
		render() {
			var existedToken = AuthProvider.GetAuthToken();
			return existedToken ? <Redirect to="/" /> : <WrappedComponent {...this.props} />;
		}
	}
	return WithoutAuth;
};

export default WithoutAuth;
