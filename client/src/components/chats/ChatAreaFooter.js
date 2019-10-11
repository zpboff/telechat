import React, { useState } from 'react';
import MessageInput from './MessageInput';
import SendMessageButton from './SendMessageButton';

export default function ChatAreaFooter() {
	const [message, setMessage] = useState('');

	const onSubmit = event => {
		event.preventDefault();
		console.log(message);
	};

	return (
		<div>
			<MessageInput value={message} onChange={setMessage} />
			<SendMessageButton onSubmit={onSubmit} />
		</div>
	);
}
