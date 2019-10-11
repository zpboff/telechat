import React from 'react';
import { NavLink } from 'react-router-dom';

function ChatItem({ chat }) {
	return (
		<div>
			<NavLink to={`/chat/${chat.id}`} style={{ color: 'black' }} activeClassName="active" title={chat.title}>
				{chat.title}
				<p>{JSON.stringify(chat.members)}</p>
			</NavLink>
		</div>
	);
}

export default ChatItem;
