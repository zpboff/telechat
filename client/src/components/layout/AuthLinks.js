import React from 'react'
import { NavLink } from 'react-router-dom';

export default function AuthLinks(props) {
    return (
        <ul>
            <li>
                <NavLink to="/login">Вход</NavLink>
            </li>
            <li>
                <NavLink to="/register">Регистрация</NavLink>
            </li>
        </ul>
    )
}