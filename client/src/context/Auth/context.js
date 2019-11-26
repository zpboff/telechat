import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getDefautAuthState } from './defaultState';
import { signinAction } from './actions';
import { authReducer } from './reducer';
import { refreshToken } from '../../providers/authProvider';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const defaultAuthState = getDefautAuthState();
	const [authState, dispatch] = useReducer(authReducer, defaultAuthState);

	const actions = {
		signin: payload => dispatch({ type: signinAction, payload }),
	};

	useEffect(() => {
		refreshToken(actions.signin);
	}, []);

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
