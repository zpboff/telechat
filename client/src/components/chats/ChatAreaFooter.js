import React from 'react';
import MessageInput from './MessageInput';
import SendMessageButton from './SendMessageButton';

export default function ChatAreaFooter() {
	return (
		<div>
			<MessageInput />
			<SendMessageButton />
		</div>
	);
}
