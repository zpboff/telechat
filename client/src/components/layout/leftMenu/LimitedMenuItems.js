import React from 'react';
import { NavLink } from 'react-router-dom';
export default function LimitedMenuItems() {
	return (
		<ul>
			<li tabindex="0" class="icon-settings">
				<NavLink to="/">
					<span>Настройки</span>
				</NavLink>
			</li>
		</ul>
	);
}
