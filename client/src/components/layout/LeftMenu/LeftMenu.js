import React from 'react';
import { leftMenuItems } from '../../../constants/leftMenuItems';
import LeftMenuItem from './LeftMenuItem';

export default function LeftMenu({ isAuth }) {
	if (!isAuth) {
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
