import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../shared/Icon';

class SignoutLinks extends Component {
	render() {
		return (
			<Fragment>
				<li>
					<NavLink to="/logout" activeClassName="active" title="Выход" className="icon">
						<Icon icon="exit_to_app" />
					</NavLink>
				</li>
			</Fragment>
		);
	}
}

export default SignoutLinks;
