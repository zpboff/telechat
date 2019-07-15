import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { userType } from '../../helpers/propTypesHelper';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from '../auth/Signin';
import Signup from '../auth/Signup';
import NotFound from '../shared/NotFound';
import Home from '../Home';

@inject(stores => {
	return {
		user: stores.rootStore.user,
	};
})
@observer
class Layout extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/signin" component={Signin} />
					<Route path="/signup" component={Signup} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

Layout.propTypes = {
	user: userType,
};

export default Layout;
