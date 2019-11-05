import React from 'react';
import WithAuth from './shared/WithAuth';
import { withRouter } from "react-router";

@withRouter
@WithAuth
class Home extends React.Component {
	render() {
		return (
            'Home'
		);
	}
}

export default Home;
