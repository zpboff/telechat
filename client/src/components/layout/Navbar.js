import React, { Component } from "react";
import AccountLinks from "./AccountLinks";
import AuthLinks from "./AuthLinks";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../images/logo.png";

class Navbar extends Component {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <header>
                <div className='logo'>
                    <NavLink to="/">
                        <img src={logo} alt='Логотип' />
                    </NavLink>
                </div>
                <nav>
                    {isAuthenticated ? <AccountLinks /> : <AuthLinks />}
                </nav>
            </header>
        );
    }
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
