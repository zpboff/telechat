import React, { Component } from 'react';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputWithError from '../shared/InputWithError';
import { NavLink } from 'react-router-dom';
import '../../styles/auth.css';
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
			// <Container component="main" maxWidth="xs">
			// 	<CssBaseline />
			// 	<div className="paper">
			// 		<Avatar className="avatar">
			// 			<LockOutlinedIcon />
			// 		</Avatar>
			// 		<Typography component="h1" variant="h5">
			// 			Регистрация
			// 		</Typography>
			// 		<form noValidate onSubmit={this.handleSubmit}>
			// 			<Grid container spacing={2}>
			// 				<Grid item xs={12} sm={6}>
			// 					<InputWithError
			// 						handleInputChange={this.handleInputChange}
			// 						value={firstName}
			// 						inputError={errors.firstName}
			// 						type="text"
			// 						id="firstName"
			// 						label="Имя"
			// 					/>
			// 				</Grid>
			// 				<Grid item xs={12} sm={6}>
			// 					<InputWithError
			// 						handleInputChange={this.handleInputChange}
			// 						value={lastName}
			// 						inputError={errors.lastName}
			// 						type="text"
			// 						id="lastName"
			// 						label="Фамилия"
			// 					/>
			// 				</Grid>
			// 				<Grid item xs={12}>
			// 					<InputWithError
			// 						handleInputChange={this.handleInputChange}
			// 						value={email}
			// 						inputError={errors.email}
			// 						type="email"
			// 						id="email"
			// 						label="Email"
			// 					/>
			// 				</Grid>
			// 				<Grid item xs={12}>
			// 					<InputWithError
			// 						handleInputChange={this.handleInputChange}
			// 						value={password}
			// 						inputError={errors.password}
			// 						type="password"
			// 						id="password"
			// 						label="Пароль"
			// 					/>
			// 				</Grid>
			// 				<Grid item xs={12}>
			// 					<InputWithError
			// 						handleInputChange={this.handleInputChange}
			// 						value={passwordConfirm}
			// 						inputError={errors.passwordConfirm}
			// 						type="password"
			// 						id="passwordConfirm"
			// 						label="Подтверждение пароля"
			// 					/>
			// 				</Grid>
			// 			</Grid>
			// 			<Button type="submit" fullWidth variant="contained" color="primary" className="submit">
			// 				Зарегистрироваться
			// 			</Button>
			// 			<Grid container justify="flex-end">
			// 				<Grid item>
			// 					<NavLink to="/login">Уже есть аккаунт? Вход</NavLink>
			// 				</Grid>
			// 			</Grid>
			// 		</form>
			// 	</div>
			// </Container>
			<div></div>
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
