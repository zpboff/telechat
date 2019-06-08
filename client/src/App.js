import React, { Component } from "react";
import Layout from './components/layout/Layout';
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logout } from './actions/auth';
import AuthProvider from './providers/authProvider';

if (localStorage.jwtToken) {
    AuthProvider.SetAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Layout />
        );
    }
}

export default App
