import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

const WithoutAuth = WrappedComponent => {
	@inject('user')
	@observer
	class WithoutAuth extends Component {
		render() {
			return this.props.user.isAuthenticated ? <Redirect to="/" /> : <WrappedComponent {...this.props} />;
		}
	}
	return WithoutAuth;
};

export default WithoutAuth;
