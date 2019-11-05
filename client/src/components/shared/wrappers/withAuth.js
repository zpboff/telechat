import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = WrappedComponent => {
	return props => {
		return props.isAuthenticated ? <WrappedComponent {...props} /> : <Redirect to="/signin" />;
	};
};

export default withAuth;
