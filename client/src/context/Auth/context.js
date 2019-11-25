import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { defaultAuthState } from './defaultState';
import { signinAction } from './actions';
import { authReducer } from './reducer';
import { getRefreshToken } from '../../providers/authProvider';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, defaultAuthState);

	useEffect(() => {
		var refreshToken = getRefreshToken();
		if (refreshToken) {
			console.log(refreshToken);
		}
	}, []);

	const actions = {
		signin: payload => dispatch({ type: signinAction, payload }),
	};

	return <AuthContext.Provider value={{ actions, authState }}>{children}</AuthContext.Provider>;
};

export function useIsAuthenticate() {
	var { authState } = useContext(AuthContext);
	return !!authState.accessToken;
}

export function useSignin() {
	var { actions } = useContext(AuthContext);
	return actions.signin;
}
