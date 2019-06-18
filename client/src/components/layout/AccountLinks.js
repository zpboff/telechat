import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { NavLink, withRouter } from "react-router-dom";

class AccountLinks extends Component {
    logout = (event) => {
		event.preventDefault();
        this.props.logout(this.props.history);
    };

    render() {
        return (
            <ul>
                <li>
                    <NavLink to="/profile">Профиль</NavLink>
                </li>
                <li>
                    <a href="/logout" onClick={this.logout}>
                        Выход
                    </a>
                </li>
            </ul>
        );
    }
}

AccountLinks.propTypes = {
    initials: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        initials: state.auth.user.initials,
        avatar: state.auth.user.avatar
    };
};

const mapDispatchToProps = dispatch => ({
    logout: history => dispatch(logout(history))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AccountLinks));
