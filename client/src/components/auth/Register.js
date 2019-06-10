import React, { Component } from 'react';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import withoutAuth from '../shared/withoutAuth';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			lastName: '',
			firstName: '',
			passwordConfirm: '',
			errors: {}
		};
	}

	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.register({ ...this.state }, this.props.history);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	render() {
		var { email, password, passwordConfirm, lastName, firstName, errors } = this.state;
		return (
			<div>Register</div>
		);
	}
}

Register.propTypes = {
	errors: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	errors: state.auth.errors
});

const mapDispatchToProps = (dispatch) => ({
	register: (user, history) => dispatch(register(user, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withoutAuth(Register));
