import AppBar from '@material-ui/core/AppBar'
import React, { Component } from 'react'
import UserLinks from './UserLinks'
import AuthLinks from './AuthLinks';
import { Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../../styles/navbar.css';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    renderLeftMenu = () => {
        return (
            <IconButton
                edge="start"
                className='menu-btn'
                color="inherit"
                aria-label="Open drawer"
            >
                <MenuIcon />
            </IconButton>
        )
    }

    renderLinks = () => {
        if (true) {
            return <UserLinks />;
        }
        return <AuthLinks />
    }

    render() {
        return (
            <div className='grow'>
                <AppBar className='navbar' position="static">
                    <Toolbar>
                        {this.renderLeftMenu()}
                        <NavLink to="/" className='home-link'>
                            <Typography variant="h6" className=''>
                                Home
                            </Typography>
                        </NavLink>
                        <div className='section-desktop'>
                            {this.renderLinks()}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
export default Navbar