import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import NotFound from './shared/NotFound';
import Home from './Home';
import Header from './layout/Header';
import Logout from './auth/Logout';
import Error from './shared/Error';
import LeftMenu from './layout/LeftMenu/LeftMenu';

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
						<Route path="/signup" component={Signup} />
						<Route path="/logout" component={Logout} />
						<Route path="/error" component={Error} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</section>
		</Fragment>
	);
}
