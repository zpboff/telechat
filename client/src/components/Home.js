import React from 'react';
import withAuth from './shared/wrappers/withAuth';
import { withRouter } from "react-router";

@withRouter
@withAuth
class Home extends React.Component {
	render() {
		return (
            'Home'
		);
	}
}

export default Home;
