import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputWithError = (props) => {
	const { id, label, type, value, inputError, handleInputChange } = props;

	if (inputError) {
		return (
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				error
				id={id}
				label={inputError}
				name={id}
				autoComplete={id}
				onChange={handleInputChange}
				autoFocus
				type={type}
				value={value}
			/>
		);
	}

	return (
		<TextField
			variant="outlined"
			margin="normal"
			required
			fullWidth
			id={id}
			label={label}
			name={id}
			autoComplete={id}
			onChange={handleInputChange}
			autoFocus
			type={type}
			value={value}
		/>
	);
};

export default InputWithError;
