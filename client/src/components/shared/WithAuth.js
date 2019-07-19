import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

const WithAuth = WrappedComponent => {
	@inject('user')
	@observer
	class WithAuth extends Component {
		render() {
			return this.props.user.isAuthenticated ? <WrappedComponent {...this.props} /> : <Redirect to="/target" />;
		}
	}
	return WithAuth;
};

export default WithAuth;
