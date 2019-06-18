import axios from "axios";
import { UsersActions } from "../constants/actions";
import ConnectionStrings from '../constants/conStrings'

const setErrors = errors => ({
    type: UsersActions.SET_USER_ERRORS,
    errors
})

export const getTopUsers = () => dispatch => {
    axios
        .get(`${ConnectionStrings.UsersApiUrl}/gettopusers`)
        .then(res => {
            const { users } = res.data;
            dispatch({
                type: UsersActions.SET_TOP_USERS,
                users
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
        });
};

