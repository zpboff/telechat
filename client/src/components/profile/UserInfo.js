import React, { useEffect, useState } from 'react';
import UsersProvider from '../../providers/usersProvider';
import ApiProvider from '../../providers/apiProvider';
import ConnectionStrings from '../../constants/conStrings';
import { withRouter } from 'react-router-dom';

function UserInfo({ match, history }) {
	const { id } = match.params;

	const [user, setUser] = useState({});

	const createChat = () => {
		ApiProvider.Post(
			`${ConnectionStrings.ChatApi}/createprivatechat`,
			{ members: [user.userId], title: user.initials },
			res => {
				history.push(`/chat/${res.data.chatId}`);
			}
		);
	};

	useEffect(() => {
		let isMounted = true;
		UsersProvider.GetUserInfo(id, user => {
			if (isMounted) {
				setUser(user);
			}
		});
		return () => (isMounted = false);
	}, []);

	return (
		<div>
			{JSON.stringify(user)}
			<button onClick={createChat} type="button">
				Написать сообщение
			</button>
		</div>
	);
}

export default withRouter(UserInfo);
