import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = WrappedComponent => {
	return props => {
		return props.isAuthenticated ? <Redirect to="/" /> : <WrappedComponent {...props} />;
	};
};

export default withAuth;
