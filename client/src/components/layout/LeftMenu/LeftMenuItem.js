import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LeftMenuItem({ link, title, icon }) {
	return (
		<li>
			<NavLink to={link} className="icon" activeClassName="active" title={title}>
				<i class="material-icons">{icon}</i>
			</NavLink>
		</li>
	);
}
