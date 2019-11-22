import React, { createContext, useContext, useReducer } from 'react';
import { defaultAuthState } from './defaultState';
import { signinAction } from './actions';
import { authReducer } from './reducer';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, defaultAuthState);

	const actions = {
		signin: accessToken => dispatch({ type: signinAction, accessToken }),
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
