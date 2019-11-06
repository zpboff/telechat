import React from 'react';
import FormInput from '../../shared/forms/FormInput';

export default function LastNameInput({ lastName, onChange }) {
	return (
		<FormInput
			type="text"
			name="lastName"
			placeholder="Введите фамилию"
			title="Фамилия"
			value={lastName}
			onChange={onChange}
		/>
	);
}
