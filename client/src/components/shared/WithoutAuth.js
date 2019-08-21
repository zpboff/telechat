import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

const WithoutAuth = WrappedComponent => {
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
