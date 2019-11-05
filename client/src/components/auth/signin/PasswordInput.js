import React from 'react';
import FormInput from '../../shared/FormInput';

export default function PasswordInput({ password, onChange }) {
	return (
		<FormInput
			type="password"
			name="password"
			placeholder="Пароль"
			title="Пароль"
			value={password}
			onStateChange={onChange}
		/>
	);
}
