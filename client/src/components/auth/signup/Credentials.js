import React, { Fragment } from 'react';
import EmailInput from '../../shared/forms/EmailInput';
import PasswordInput from '../../shared/forms/PasswordInput';

export default function Credentials({ email, password, onChange }) {
	return (
		<Fragment>
			<EmailInput onChange={onChange} email={email} />
			<PasswordInput onChange={onChange} password={password} />
		</Fragment>
	);
}
