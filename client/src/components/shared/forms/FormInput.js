import React, { Fragment } from 'react';
import Input from '../Input';

export default function FormInput({ type, name, placeholder, title, value, onChange }) {
	return (
		<Fragment>
			<p>{title}</p>
			<Input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
		</Fragment>
	);
}
