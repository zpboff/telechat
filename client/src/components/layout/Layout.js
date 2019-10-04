import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router';
import Signin from '../auth/Signin';
import Signup from '../auth/signup/Signup';
import NotFound from '../shared/NotFound';
import Home from '../Home';
import AuthProvider from '../../providers/authProvider';
import Header from './Header';
import Logout from '../auth/Logout';
import Error from '../shared/Error';
import LeftMenu from './LeftMenu/LeftMenu';
import FriendsList from '../friends/FriendsList';
import Profile from '../profile/Profile';
import UserInfo from '../profile/UserInfo';
import ChatList from '../chats/ChatList';

@inject('auth')
@observer
class Layout extends Component {
	refreshToken = () => {
		var token = AuthProvider.GetAuthToken();
		if (token) {
			this.props.auth.setToken(token);
		}
	};

	componentWillReceiveProps() {
		this.refreshToken();
	}

	componentWillMount() {
		this.refreshToken();
	}

	render() {
		var isAuth = this.props.auth.isAuthenticated;
		return (
			<Fragment>
				<Header />
				<section className="layout">
					<LeftMenu isAuth={isAuth} />
					<div className="page-content">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/signin" component={Signin} />
							<Route path="/profile" component={Profile} />
							<Route path="/friends" component={FriendsList} />
							<Route path="/signup" component={Signup} />
							<Route path="/logout" component={Logout} />
							<Route path="/userinfo/:id" component={UserInfo} />
							<Route path="/chat" component={ChatList} />
							<Route path="/chat/:chatId" component={ChatList} />
							<Route path="/error" component={Error} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default Layout;
