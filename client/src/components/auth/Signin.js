import React, { useState } from 'react';
import withoutAuth from '../shared/wrappers/withoutAuth';
import { withRouter } from 'react-router';
import EmailInput from '../shared/forms/EmailInput';
import PasswordInput from '../shared/forms/PasswordInput';
import { getInputChanger, getMappedHook } from '../shared/forms/inputLogic';

function Signin() {
	const { email, password, onChange } = getInputChanger(
		getMappedHook('password', useState('')),
		getMappedHook('email', useState(''))
	);

	const handleSubmit = event => {
		event.preventDefault();
	};

	return (
		<div className="login-form">
			<form noValidate onSubmit={handleSubmit}>
				<img src="./images/avatar.svg" alt="Аватар" />
				<h1>Вход</h1>
				<EmailInput email={email} onChange={onChange} />
				<PasswordInput password={password} onChange={onChange} />
				<button type="submit">Войти</button>
				<a href="/restore">Забыли пароль?</a>
				<a href="/signup">Нет учетной записи?</a>
			</form>
		</div>
	);
}

export default withoutAuth(withRouter(Signin));
