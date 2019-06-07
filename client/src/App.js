import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import store from './store/store'
import AuthProvider from './providers/authProvider'
import { setCurrentUser, logout } from "./actions/auth";
import Layout from './components/layout/Layout';

if (localStorage.jwtToken) {
    AuthProvider.SetAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Layout />
        );
    }
}

export default App;
