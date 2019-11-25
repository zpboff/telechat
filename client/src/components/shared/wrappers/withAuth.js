import React from 'react';
import { Redirect } from 'react-router-dom';
import { useIsAuthenticate } from '../../../context/auth/context';

export default function withAuth(WrappedComponent) {
	return function(props) {
		const isAuthenticated = useIsAuthenticate();
		return isAuthenticated ? <WrappedComponent {...props} /> : <Redirect to="/signin" />;
	};
}
