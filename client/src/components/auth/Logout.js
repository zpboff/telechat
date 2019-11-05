import { Component } from 'react';
import WithAuth from '../shared/WithAuth';
import { withRouter } from "react-router";

@WithAuth
@withRouter
class Logout extends Component {
	componentDidMount() {
		this.props.auth.logout();
	}
	render() {
		return null;
	}
}

export default Logout;
