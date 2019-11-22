import React from 'react';
import { leftMenuItems } from '../../../constants/leftMenuItems';
import LeftMenuItem from './LeftMenuItem';
import { useIsAuthenticate } from '../../../context/auth/context';

export default function LeftMenu() {
	const isAuthenticated = useIsAuthenticate();

	if (!isAuthenticated) {
		return null;
	}

	return (
		<div className="left-menu">
			<nav>
				<ul>
					{leftMenuItems.map(x => (
						<LeftMenuItem {...x} key={x.icon} />
					))}
				</ul>
			</nav>
		</div>
	);
}
