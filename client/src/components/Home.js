import React from 'react';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';
import WithAuth from './shared/WithAuth';
import { withRouter } from "react-router";

@inject('auth')
@withRouter
@WithAuth
@observer
class Home extends React.Component {
	render() {
		return (
            'Home'
		);
	}
}

export default Home;
