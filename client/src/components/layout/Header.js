import React from 'react';
import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';
import { NavLink } from 'react-router-dom';
import { useIsAuthenticate } from '../../context/auth/context';

export default function Header() {
	const isAuthenticated = useIsAuthenticate();

	const Links = isAuthenticated ? SignoutLinks : SigninLinks;

	return (
		<header>
			<section className="logo-container">
				<NavLink to="/" exact className="icon">
					t
				</NavLink>
				<div className="logo-filler" />
			</section>
			<nav>
				<ul>
					<Links />
				</ul>
			</nav>
		</header>
	);
}
