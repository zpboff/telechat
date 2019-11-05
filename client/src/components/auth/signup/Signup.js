import React, { Component } from 'react';
import { withRouter } from 'react-router';
import WithoutAuth from '../../shared/WithoutAuth';
import SignupBody from './SignupBody';
import SignupButton from './SignupButton';

@WithoutAuth
@withRouter
class Signup extends Component {
	handelSubmit = event => {
		event.preventDefault();
		//this.props.auth.signup(signupModel);
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		//signupModel.setField(name, value);
	};

	switchStep = event => {
		event.preventDefault();
		if (true) {
			//signupModel.goTo(signupStep.Personal);
			return;
		}
		//signupModel.goTo(signupStep.Credentials);
	};

	render() {
		return (
			<div className="login-form">
				<form noValidate onSubmit={this.handelSubmit}>
					<img src="./images/avatar.svg" alt="Аватар" />
					<h1>Вход</h1>
					<SignupBody onChange={this.handleInputChange} />
					<SignupButton switchStep={this.switchStep} />
					<a href="/signin">Уже есть учетная запись?</a>
				</form>
			</div>
		);
	}
}

export default Signup;
