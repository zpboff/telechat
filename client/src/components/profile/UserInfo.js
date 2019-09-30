import React, { useEffect, useState } from 'react';
import UsersProvider from '../../providers/usersProvider';

export default function UserInfo({ match }) {
	const { id } = match.params;

	const [user, setUser] = useState({});

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
			<button onClick={() => {}} type="button">
				Написать сообщение
			</button>
		</div>
	);
}
