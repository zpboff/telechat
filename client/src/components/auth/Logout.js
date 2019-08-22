import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import WithAuth from '../shared/WithAuth';

@inject('auth')
@WithAuth
@observer
export default class Logout extends Component {
	componentDidMount() {
		this.props.auth.logout();
	}
	render() {
		return null;
	}
}
