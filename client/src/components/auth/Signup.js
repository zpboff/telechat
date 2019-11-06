import React, { useState } from 'react';
import { withRouter } from 'react-router';
import withoutAuth from '../shared/wrappers/withoutAuth';
import SignupBody from './signup/SignupBody';
import SignupButton from './signup/SignupButton';
import { signupStep } from './signup/consts';
import { getInputChanger, getMappedHook } from '../shared/forms/inputLogic';

function Signup() {
	const [step, setStep] = useState(signupStep.Credentials);

	const inputChanger = getInputChanger(
		getMappedHook('password', useState('')),
		getMappedHook('email', useState('')),
		getMappedHook('firstName', useState('')),
		getMappedHook('lastName', useState(''))
	);

	const handleSubmit = event => {
		event.preventDefault();
		//this.props.auth.signup(signupModel);
	};

	const switchStep = event => {
		event.preventDefault();
		setStep(Math.min(step + 1, Object.values(signupStep).length));
	};

	return (
		<div className="login-form">
			<form noValidate onSubmit={handleSubmit}>
				<img src="./images/avatar.svg" alt="Аватар" />
				<h1>Вход</h1>
				<SignupBody inputChanger={inputChanger} step={step} />
				<SignupButton switchStep={switchStep} step={step} />
				<a href="/signin">Уже есть учетная запись?</a>
			</form>
		</div>
	);
}

export default withoutAuth(withRouter(Signup));
