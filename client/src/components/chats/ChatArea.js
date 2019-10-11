import React from 'react';
import { observer, inject } from 'mobx-react';

function ChatArea({ chats }) {
	if (!chats.currentChat) {
		return <div>Выберите беседу или создайте новую</div>;
	}

	return <div>{chats.currentChat.title}</div>;
}

export default inject('chats')(observer(ChatArea));
