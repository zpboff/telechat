
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import InputWithError from '../shared/InputWithError';
import withoutAuth from '../shared/withoutAuth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    handeSubmit = event => {
        event.preventDefault();
        this.props.login({ ...this.state });
    };

	render() {
		const { email, errors, password } = this.state;
		return (
			<div>Login</div>
		);
	}
}

Login.propTypes = {
    errors: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withoutAuth(Login));
