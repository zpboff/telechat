import { Component } from 'react';
import withAuth from '../shared/wrappers/withAuth';
import { withRouter } from "react-router";

@withAuth
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
