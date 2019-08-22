import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Signin from '../auth/Signin';
import Signup from '../auth/Signup';
import NotFound from '../shared/NotFound';
import Home from '../Home';
import AuthProvider from '../../providers/authProvider';
import Header from './Header';
import Logout from '../auth/Logout';

@inject('auth')
@observer
class Layout extends Component {
	componentDidMount() {
		if (AuthProvider.GetAuthToken()) {
			this.props.auth.signin();
		}
	}

	render() {
		return (
			<div>
				<Router history={createBrowserHistory()}>
					<Header />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" component={Signin} />
						<Route path="/signup" component={Signup} />
						<Route path="/logout" component={Logout} />
						<Route component={NotFound} />
					</Switch>
				</Router>
				<div style={{height: '1000px'}}>
					d
				</div>
			</div>
		);
	}
}

export default Layout;
