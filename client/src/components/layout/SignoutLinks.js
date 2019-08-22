import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

@inject('auth')
@observer
class SignoutLinks extends Component {
	logout = () => {
		this.props.auth.logout();
	};
	render() {
		return (
			<Fragment>
				<NavLink to="/" activeClassName="active">
					Главная
				</NavLink>
				<NavLink to="/logout" activeClassName="active">
					Выход
				</NavLink>
			</Fragment>
		);
	}
}

export default SignoutLinks;
