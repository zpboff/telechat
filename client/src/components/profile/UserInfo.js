import React, { useEffect, useState } from 'react';
import UsersProvider from '../../providers/usersProvider';

export default function UserInfo({ match }) {
	const { id } = match.params;

	const [user, setUser] = useState({});

	useEffect(() => {
		UsersProvider.GetUserInfo(id, user => {
			setUser(user);
		});
	});

	return <div>{JSON.stringify(user)}</div>;
}
