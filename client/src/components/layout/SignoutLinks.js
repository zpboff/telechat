import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { NavLink } from "react-router-dom";

@inject("auth")
@observer
class SignoutLinks extends Component {
    render() {
        return (
            <Fragment>
                <li>
                    <NavLink
                        to="/logout"
                        activeClassName="active"
                        title="Выход"
                        className="icon"
                    >
                        <i class="material-icons">input</i>
                    </NavLink>
                </li>
            </Fragment>
        );
    }
}

export default SignoutLinks;
