import React, { useState } from 'react';
import withoutAuth from '../../shared/wrappers/withoutAuth';
import { withRouter } from 'react-router';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = event => {
		event.preventDefault();
		const payload = { email, password };
	};

	return (
		<div className="login-form">
			<form noValidate onSubmit={handleSubmit}>
				<img src="./images/avatar.svg" alt="Аватар" />
				<h1>Вход</h1>
				<EmailInput email={email} onChange={setEmail} />
				<PasswordInput password={password} onChange={setPassword} />
				<button type="submit">Войти</button>
				<a href="/restore">Забыли пароль?</a>
				<a href="/signup">Нет учетной записи?</a>
			</form>
		</div>
	);
}

export default withoutAuth(withRouter(Signin));
