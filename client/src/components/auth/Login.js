import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink } from 'react-router-dom';
import '../../styles/auth.css';
import InputWithError from '../shared/InputWithError';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isAuthenticated) {
			this.props.history.push('/');
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	};

	handeSubmit = (event) => {
		event.preventDefault();
		this.props.login({ ...this.state });
	};

	render() {
		const { email, errors, password } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className="paper">
					<Avatar className="avatar">
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form noValidate onSubmit={this.handeSubmit}>
						<InputWithError
							handleInputChange={this.handleInputChange}
							value={email}
							inputError={errors.email}
							type="text"
							id="email"
							label="Email"
						/>
						<InputWithError
							handleInputChange={this.handleInputChange}
							value={password}
							inputError={errors.password}
							type="password"
							id="password"
							label="Пароль"
						/>
						<Button type="submit" fullWidth variant="contained" color="primary" className="submit">
							Вход
						</Button>
						<Grid container>
							<Grid item xs>
								<NavLink to="/recover">Забыли пароль?</NavLink>
							</Grid>
							<Grid item>
								<NavLink to="/register">Нет аккаунта? Регистрация</NavLink>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

Login.propTypes = {
	errors: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	errors: state.auth.errors,
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => {
	return {
		login: (user) => dispatch(login(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
