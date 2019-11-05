import React, { useEffect } from 'react';
import ChatsProvider from '../../providers/chatProvider';
import ChatItem from './ChatItem';
import ChatArea from './ChatArea';
import { withRouter } from 'react-router-dom';

function ChatList({ chats, match }) {
	useEffect(() => {
		var isMounted = true;
		ChatsProvider.GetChatList(chatList => {
			if (isMounted) {
				chats.setChats(chatList);
			}
		});
		return () => (isMounted = false);
	}, []);

	const { chatList } = chats;

	return (
		<div>
			{chatList && chatList.map(chat => <ChatItem key={chat.id} chat={chat} />)}
			<ChatArea chatId={match.params.chatId} />
		</div>
	);
}

export default withRouter(ChatList);
