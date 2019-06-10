import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputWithError = (props) => {
	const { id, label, type, value, inputError, handleInputChange } = props;

	if (inputError) {
		return (
			<input type='text' />
		);
	}

	return (
		<input type='text' />
	);
};

export default InputWithError;
