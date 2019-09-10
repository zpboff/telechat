import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import UsersProvider from '../../providers/usersProvider';

@inject('users')
@observer
export default class FriendsList extends Component {
	componentDidMount() {
		UsersProvider.GetAll(this.props.users.setUsers);
	}

	render() {
		const { userList } = this.props.users;
		return <div>{userList.map(x => x.firstName)}</div>;
	}
}
