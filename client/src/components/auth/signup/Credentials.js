import React, { Fragment } from 'react';

export default function Credentials({ firstName, lastName, onChange }) {
	return (
		<Fragment>
			<p>Имя</p>
			<input type="text" name="firstName" placeholder="Введите имя" onChange={onChange} value={firstName} />
			<p>Фамилия</p>
			<input type="text" name="lastName" placeholder="Введите фамилию" onChange={onChange} value={lastName} />
		</Fragment>
	);
}
