import React from 'react';
import { Redirect } from 'react-router-dom';
import { useIsAuthenticate } from '../../../context/auth/context';

export function withoutAuth(WrappedComponent) {
	return function(props) {
		const isAuthenticated = useIsAuthenticate();

		return isAuthenticated ? <Redirect to="/" /> : <WrappedComponent {...props} />;
	};
}
