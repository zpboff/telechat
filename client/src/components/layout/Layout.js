import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Signin from '../auth/signin/Signin';
import Signup from '../auth/signup/Signup';
import NotFound from '../shared/NotFound';
import Home from '../Home';
import Header from './Header';
import Logout from '../auth/Logout';
import Error from '../shared/Error';
import LeftMenu from './LeftMenu/LeftMenu';
import FriendsList from '../friends/FriendsList';
import Profile from '../profile/Profile';
import UserInfo from '../profile/UserInfo';
import ChatList from '../chats/ChatList';

export default function Layout() {
	return (
		<Fragment>
			<Header />
			<section className="layout">
				<LeftMenu />
				<div className="page-content">
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" component={Signin} />
						<Route path="/profile" component={Profile} />
						<Route path="/friends" component={FriendsList} />
						<Route path="/signup" component={Signup} />
						<Route path="/logout" component={Logout} />
						<Route path="/userinfo/:id" component={UserInfo} />
						<Route path="/chat/:chatId?" component={ChatList} />
						<Route path="/error" component={Error} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</section>
		</Fragment>
	);
}
