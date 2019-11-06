import React from 'react';
import FormInput from '../../shared/forms/FormInput';

export default function FirstNameInput({ firstName, onChange }) {
	return (
		<FormInput
			type="text"
			name="firstName"
			placeholder="Введите имя"
			title="Имя"
			value={firstName}
			onChange={onChange}
		/>
	);
}
