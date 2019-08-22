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
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" component={Signin} />
						<Route path="/signup" component={Signup} />
						<Route component={NotFound} />
					</Switch>
					<Header />
				</Router>
			</div>
		);
	}
}

export default Layout;
