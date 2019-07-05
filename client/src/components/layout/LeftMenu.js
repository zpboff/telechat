import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class LeftMenu extends Component {
    render() {
        return (
            <nav className="left-menu">
                <ul>
                    <li>
                        <NavLink to="/profile">
                            <img
                                src={require("../../images/icons/baseline-account_box-24px.svg")}
                                alt="Профиль"
                            />
                            <span>Профиль</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/chats">
                            <img
                                src={require("../../images/icons/baseline-chat-24px.svg")}
                                alt="Диалоги"
                            />
                            <span>Диалоги</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/friends">
                            <img
                                src={require("../../images/icons/baseline-supervisor_account-24px.svg")}
                                alt="Друзья"
                            />
                            <span>Друзья</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">
                            <img
                                src={require("../../images/icons/baseline-supervisor_account-24px.svg")}
                                alt="Все пользователи"
                            />
                            <span>Все пользователи</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calendar">
                            <img
                                src={require("../../images/icons/baseline-calendar_today-24px.svg")}
                                alt="Календарь"
                            />
                            <span>Календарь</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings">
                            <img
                                src={require("../../images/icons/baseline-settings-20px.svg")}
                                alt="Настройки"
                            />
                            <span>Настройки</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default LeftMenu;
