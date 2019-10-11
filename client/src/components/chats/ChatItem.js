import React from 'react';
import { observer, inject } from 'mobx-react';

function ChatItem({ chat, chats }) {
	const setCurrentChat = () => {
		chats.selectChat(chat.id);
	};

	return (
		<div onClick={setCurrentChat}>
			{chat.title}
			<p>{JSON.stringify(chat.members)}</p>
		</div>
	);
}

export default inject('chats')(observer(ChatItem));
