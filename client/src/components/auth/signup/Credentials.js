import React, { Fragment } from 'react';

export default function Credentials({ email, password, onChange }) {
	return (
		<Fragment>
			<p>Email</p>
			<input type="text" name="email" placeholder="Введите email" value={email} onChange={onChange} />
			<p>Пароль</p>
			<input type="password" name="password" placeholder="Введите пароль" value={password} onChange={onChange} />
		</Fragment>
	);
}
