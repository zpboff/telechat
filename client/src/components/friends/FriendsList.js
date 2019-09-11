import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import UsersProvider from '../../providers/usersProvider';
import UserCard from './UserCard';

@inject('users')
@observer
export default class FriendsList extends Component {
	componentDidMount() {
		UsersProvider.GetAll(this.props.users.setUsers);
	}

	render() {
		var { userList } = this.props.users;
		// userList = userList.concat(userList);
		// userList = userList.concat(userList);
		return (
			<div className="friends-list">
				{userList.map(x => (
					<UserCard key={x.firstName} user={x} />
				))}
			</div>
		);
	}
}
