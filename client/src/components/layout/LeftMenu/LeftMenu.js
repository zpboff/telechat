import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class LeftMenu extends Component {
    render() {
        return (
            <div className="left-menu">
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/profile"
                                className="icon"
                                activeClassName="active"
                                title='Профиль'
                            >
                                <i class="material-icons">account_box</i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/friends"
                                className="icon"
                                activeClassName="active"
                                title='Друзья'
                            >
                                <i class="material-icons">people</i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/messages"
                                className="icon"
                                activeClassName="active"
                                title='Сообщения'
                            >
                                <i class="material-icons">email</i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/calendar"
                                className="icon"
                                activeClassName="active"
                                title='Календарь'
                            >
                                <i class="material-icons">calendar_today</i>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
