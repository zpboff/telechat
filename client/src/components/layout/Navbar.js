import AppBar from '@material-ui/core/AppBar';
import React, { Component } from 'react';
import UserLinks from './UserLinks';
import AuthLinks from './AuthLinks';
import { Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../../styles/navbar.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
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
                                Telechat
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

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Navbar)