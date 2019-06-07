import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default (props) => (
    <>
        <NavLink to="/login" className='home-link'>
            <Button color="inherit">Login</Button>
        </NavLink>
        <NavLink to="/register" className='home-link'>
            <Button color="inherit">Register</Button>
        </NavLink>
    </>
)