import React from 'react';
import MessageList from './MessageList';
import ChatAreaFooter from './ChatAreaFooter';

function ChatArea({ chats, chatId }) {
	if (!chatId) {
		return <div>Выберите беседу или создайте новую</div>;
	}

	return (
		<div>
			{chats.currentChat.title}
			<MessageList />
			<ChatAreaFooter />
		</div>
	);
}
export default ChatArea;
