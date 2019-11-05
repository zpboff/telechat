import React, { Component } from 'react';
import UsersProvider from '../../providers/usersProvider';
import UserCard from './UserCard';

export default class FriendsList extends Component {
	componentDidMount() {
		UsersProvider.GetAll(this.props.users.setUsers);
	}

	render() {
		var { userList } = this.props.users;
		return (
			<div className="friends-list">
				{userList.map(x => (
					<UserCard key={x.firstName} user={x} />
				))}
			</div>
		);
	}
}
