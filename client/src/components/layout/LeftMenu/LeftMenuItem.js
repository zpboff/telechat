import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../../shared/Icon';

export default function LeftMenuItem({ link, title, icon }) {
	return (
		<li>
			<NavLink to={link} className="icon" activeClassName="active" title={title}>
				<Icon icon={icon} />
			</NavLink>
		</li>
	);
}
