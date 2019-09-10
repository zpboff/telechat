import React, { Component } from 'react';
import { observer } from 'mobx-react';
import signupModel from '../../models/signupModel';
import WithoutAuth from '../shared/WithoutAuth';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

@inject('auth')
@WithoutAuth
@withRouter
@observer
class Signup extends Component {
	constructor(props) {
		super(props);
		this.handelSubmit = this.handelSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handelSubmit(event) {
		event.preventDefault();
		this.props.auth.signup(signupModel);
	}

	handleInputChange(event) {
		const { name, value } = event.target;
		signupModel.setField(name, value);
	}

	render() {
		return (
			<div className="login-form">
				<form noValidate onSubmit={this.handelSubmit}>
					<img src="./images/avatar.svg" alt="Аватар" />
					<h1>Вход</h1>
					<p>Email</p>
					<input
						type="text"
						name="email"
						placeholder="Введите email"
						value={signupModel.email}
						onChange={this.handleInputChange}
					/>
					<p>Пароль</p>
					<input
						type="password"
						name="password"
						placeholder="Введите пароль"
						value={signupModel.password}
						onChange={this.handleInputChange}
					/>
					<p>Подтверждение пароля</p>
					<input
						type="password"
						name="passwordConfirmation"
						placeholder="Подтвердите пароль"
						onChange={this.handleInputChange}
						value={signupModel.passwordConfirmation}
					/>
					<p>Имя</p>
					<input
						type="text"
						name="firstName"
						placeholder="Введите имя"
						onChange={this.handleInputChange}
						value={signupModel.firstName}
					/>
					<p>Фамилия</p>
					<input
						type="text"
						name="lastName"
						placeholder="Введите фамилию"
						onChange={this.handleInputChange}
						value={signupModel.lastName}
					/>
					<button type="submit">Зарегистрироваться</button>
					<a href="/signin">Уже есть учетная запись?</a>
				</form>
			</div>
		);
	}
}

export default Signup;
