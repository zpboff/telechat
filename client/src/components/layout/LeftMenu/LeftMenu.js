import React, { Component } from 'react';
import { leftMenuItems } from '../../../constants/leftMenu';
import LeftMenuItem from './LeftMenuItem';

export default class LeftMenu extends Component {
	render() {
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
}
