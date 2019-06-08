import React, { Component } from 'react';
import FullMenuItems from './FullMenuItems';
import LimitedMenuItems from './LimitedMenuItems';

class LeftMenu extends Component {
	render() {
		const { avatar, isAuthenticated } = this.props;
		return (
			<nav className="menu" tabIndex="0">
				<div className="smartphone-menu-trigger" />
				{isAuthenticated ? (
					<header className="avatar">
						<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" alt="Аватар" />
					</header>
				) : null}
				{isAuthenticated ? <FullMenuItems /> : <LimitedMenuItems />}
			</nav>
		);
	}
}

export default LeftMenu;
