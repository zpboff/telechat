import React from 'react';

function ChatItem({ chat, selectChat }) {
	const setCurrentChat = () => {
		selectChat(chat.id);
	};

	return (
		<div onClick={setCurrentChat}>
			{chat.title}
			<p>{JSON.stringify(chat.members)}</p>
		</div>
	);
}

export default ChatItem;
