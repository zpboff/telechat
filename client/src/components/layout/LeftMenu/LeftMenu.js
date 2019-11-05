import React from 'react';
import { leftMenuItems } from '../../../constants/leftMenuItems';
import LeftMenuItem from './LeftMenuItem';
import { useAuth } from '../../../context/Auth/context';

export default function LeftMenu() {	
	var [{ isAuthenticated }] = useAuth();

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
