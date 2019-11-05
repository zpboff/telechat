import React, { Component } from 'react';
import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';
import { NavLink } from 'react-router-dom';

class Header extends Component {
	getLinks = () => {
		if (true) {
			return <SignoutLinks />;
		}
		return <SigninLinks />;
	};

	render() {
		return (
			<header>
				<section className="logo-container">
					<NavLink to="/" exact className="icon">
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
