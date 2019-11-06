import React, { Fragment } from 'react';
import FirstNameInput from './FirstNameInput';
import LastNameInput from './LastNameInput';

export default function Personal({ inputChanger }) {

	const { onChange, firstName, lastName } = inputChanger;

	return (
		<Fragment>
			<FirstNameInput firstName={firstName} onChange={onChange} />
			<LastNameInput lastName={lastName} onChange={onChange} />
		</Fragment>
	);
}
