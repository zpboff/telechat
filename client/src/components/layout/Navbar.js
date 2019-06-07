import AppBar from '@material-ui/core/AppBar'
import React, { Component } from 'react'
import UserLinks from './UserLinks'
import AuthLinks from './AuthLinks';
import { Toolbar } from '@material-ui/core';
import '../../styles/navbar.css';

class Navbar extends Component {
    render() {
        return (
            <AppBar className='navbar'>
                <Toolbar>
                    <AuthLinks />
                    <UserLinks />
                </Toolbar>
            </AppBar>
        );
        return (
            <>
                <div>HI</div>
                <AuthLinks />
                <UserLinks />
            </>
        )
    }
}
export default Navbar