import React from 'react';
import FormInput from './FormInput';

export default function PasswordInput({ password, onChange }) {
	return (
		<FormInput
			type="password"
			name="password"
			placeholder="Введите пароль"
			title="Пароль"
			value={password}
			onChange={onChange}
		/>
	);
}
