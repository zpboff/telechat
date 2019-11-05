import React, { createContext, useContext, useReducer } from 'react';
import { defaultAuthState } from './defaultState';
import { authReducer } from './reducer';

export const AuthContext = createContext(defaultAuthState);

export const AuthProvider = ({ children }) => (
	<AuthContext.Provider value={useReducer(authReducer, defaultAuthState)}>{children}</AuthContext.Provider>
);

export const useAuth = () => useContext(AuthContext);
