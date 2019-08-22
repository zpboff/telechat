import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default function SigninLinks() {
	return (
		<Fragment>
			<NavLink to="/signin" activeClassName="active">
				Вход
			</NavLink>
			<NavLink to="/signup" activeClassName="active">
				Регистрация
			</NavLink>
		</Fragment>
	);
}
