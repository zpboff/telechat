import React from 'react';

export default function Input({ value, onChange, placeholder, type, name}) {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
}
