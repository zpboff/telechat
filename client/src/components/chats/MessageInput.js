import React from 'react';

export default function MessageInput({ value, onChange }) {
	const onMessageChange = event => {
		const { value } = event.target;
		onChange(value);
	};

	return (
		<div>
			<textarea value={value} onChange={onMessageChange} />
		</div>
	);
}
