import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

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