import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { userType } from '../../helpers/propTypesHelper';
import { BrowserRouter, Route } from 'react-router-dom';
import Signin from '../auth/Signin';
import Signup from '../auth/Signup';

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
				<Route path="/signin" component={Signin} />
				<Route path="/signup" component={Signup} />
			</BrowserRouter>
		);
	}
}

Layout.propTypes = {
	user: userType,
};

export default Layout;
