import React, { Component } from "react";
import AccountLinks from "./AccountLinks";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../images/logo.png";

class Navbar extends Component {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <header>
                <nav>
                    <div className="hamburger">
                        <div className='line' />
                        <div className='line' />
                        <div className='line' />
                    </div>
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/" className='logo'>
                                <img src={logo} />
                            </NavLink>
                        </li>
                        <li>
                            <a href="#">Профиль</a>
                        </li>
                    </ul>
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
