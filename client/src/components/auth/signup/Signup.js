import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import signupModel from '../../../models/signupModel';
import WithoutAuth from '../../shared/WithoutAuth';
import { getProps, signupStep } from './signupLogic';
import Personal from './Personal';
import Credentials from './Credentials';

@inject('auth')
@WithoutAuth
@withRouter
@observer
class Signup extends Component {
    
	handelSubmit = event => {
		event.preventDefault();
		this.props.auth.signup(signupModel);
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		signupModel.setField(name, value);
	};

	get body() {
		const props = Object.assign(getProps(signupModel.step, signupModel), { onChange: this.handleInputChange });
		const Body = signupModel.isFistStep ? Credentials : Personal;
		return <Body {...props} />;
	}

	switchStep = event => {
		event.preventDefault();
		if (signupModel.isFistStep) {
			signupModel.goTo(signupStep.Personal);
			return;
		}
		signupModel.goTo(signupStep.Credentials);
	};

	get button() {
		if (signupModel.isFistStep) {
			return (
				<button type="button" onClick={this.switchStep}>
					Следующий шаг
				</button>
			);
		}
		return <button type="submit">Зарегистрироваться</button>;
	}

	render() {
		return (
			<div className="login-form">
				<form noValidate onSubmit={this.handelSubmit}>
					<img src="./images/avatar.svg" alt="Аватар" />
					<h1>Вход</h1>
					{this.body}
					{this.button}
					<a href="/signin">Уже есть учетная запись?</a>
				</form>
			</div>
		);
	}
}

export default Signup;
