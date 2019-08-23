import React, { Component } from 'react';
import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

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
		return (
			<header>
				<section className="logo-container">
					<NavLink to="/" activeClassName="active" className="icon">
						t
					</NavLink>
					<div className="logo-filler" />
				</section>
				<nav>
					<ul>{this.getLinks()}</ul>
				</nav>
			</header>
		);
	}
}
export default Header;
