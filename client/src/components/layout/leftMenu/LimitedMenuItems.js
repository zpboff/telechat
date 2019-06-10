import React from 'react';
import { NavLink } from 'react-router-dom';
export default function LimitedMenuItems() {
	return (
		<ul>
			<li tabindex="0">
				<NavLink to="/">
					<span>Настройки</span>
				</NavLink>
			</li>
		</ul>
	);
}
