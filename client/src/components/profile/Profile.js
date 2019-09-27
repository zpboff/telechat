import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('auth')
@observer
export default class Profile extends Component {
	render() {
		var { firstName, lastName } = this.props.auth;
		return <div className="friends-list">{`${firstName} ${lastName}`}</div>;
	}
}
