import React, { Component } from 'react';
import withoutAuth from '../shared/wrappers/withoutAuth';
import { withRouter } from 'react-router';
import Input from '../shared/Input';

@withoutAuth
@withRouter
class Signin extends Component {
	handelSubmit = event => {
		event.preventDefault();
		//this.props.auth.signin(signinModel);
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		//signinModel.setField(name, value);
	};

	render() {
		return (
			<div className="login-form">
				<form noValidate onSubmit={this.handelSubmit}>
					<img src="./images/avatar.svg" alt="Аватар" />
					<h1>Вход</h1>
					<p>Email</p>
					<Input
						type="text"
						name="email"
						placeholder="Введите email"
						// value={signinModel.email}
						onChange={this.handleInputChange}
					/>
					<p>Пароль</p>
					<Input
						type="password"
						name="password"
						placeholder="Введите пароль"
						// value={signinModel.password}
						onChange={this.handleInputChange}
					/>
					<button type="submit">Войти</button>
					<a href="/restore">Забыли пароль?</a>
					<a href="/signup">Нет учетной записи?</a>
				</form>
			</div>
		);
	}
}

export default Signin;
