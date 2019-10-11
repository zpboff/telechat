import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import ChatsProvider from '../../providers/chatProvider';
import ChatItem from './ChatItem';
import ChatArea from './ChatArea';

function ChatList({ chats }) {
	useEffect(() => {
		let isMounted = true;
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
			{chatList && chatList.map(chat => <ChatItem key={chat.id} chat={chat} selectChat={chats.selectChat} />)}
			<ChatArea />
		</div>
	);
}

export default inject('chats')(observer(ChatList));
