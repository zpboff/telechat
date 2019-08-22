import React, { Component } from 'react';
import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';
import { inject, observer } from 'mobx-react';

@inject('auth')
@observer
class Header extends Component {
	getLinks = () => {
		if (this.props.auth.isAuthenticated) {
			return <SignoutLinks />;
		}
		return <SigninLinks />;
	};

	render() {
		return this.getLinks();
	}
}
export default Header;
