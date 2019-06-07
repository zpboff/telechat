import axios from "axios";
import { AuthActions } from "../constants/actions";
import AuthProvider from "../providers/authProvider";
import jwt_decode from "jwt-decode";
import ConnectionStrings from '../constants/conStrings'

export const setCurrentUser = decoded => ({
    type: AuthActions.SET_CURRENT_USER,
    payload: decoded
});

export const setErrors = errors => ({
    type: AuthActions.SET_ERRORS,
    errors
})

export const register = (user, history) => dispatch => {
    axios
        .post(`${ConnectionStrings.AuthApiUrl}/api/auth/register`, user)
        .then(res => {
            const { token, error, success } = res.data;
            if (success) {
                localStorage.setItem("jwtToken", token);
                AuthProvider.SetAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                return;
            }
            throw new Error(error);
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
        });
};

export const login = user => dispatch => {
    axios
        .post(`${ConnectionStrings.AuthApiUrl}/api/auth/login`, user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            AuthProvider.SetAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {            
            dispatch(setErrors(err.response.data));
        });
};

export const logout = history => dispatch => {
    localStorage.removeItem("jwtToken");
    AuthProvider.SetAuthToken(false);
    dispatch(setCurrentUser({}));
    if (history) {
        history.push("/login");
    }
    else {
        window.location.href = "/login"
    }
};
