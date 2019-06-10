import React from 'react'
import { NavLink } from 'react-router-dom';

export default (props) => (
    <>
        <NavLink to="/login">
            Login
        </NavLink>
        <NavLink to="/register">
            Register
        </NavLink>
    </>
)