import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function SigninLinks() {
    return (
        <Fragment>
            <li>
                <NavLink to="/signin" activeClassName="active">
                    Вход
                </NavLink>
            </li>
            <li>
                <NavLink to="/signup" activeClassName="active">
                    Регистрация
                </NavLink>
            </li>
        </Fragment>
    );
}
