import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FullMenuItems() {
	return (
		<ul>
			<li tabindex="0" class="icon-dashboard">
				<NavLink to="/">					
					<span>Профиль</span>
				</NavLink>
			</li>
			<li tabindex="0" class="icon-customers">
				<NavLink to="/">
					<span>Диалоги</span>
				</NavLink>
			</li>
			<li tabindex="0" class="icon-users">
				<NavLink to="/">
					<span>Друзья</span>
				</NavLink>
			</li>
			<li tabindex="0" class="icon-settings">
				<NavLink to="/">
					<span>Настройки</span>
				</NavLink>
			</li>
			<li tabindex="0" class="icon-settings">
				<NavLink to="/">
					<span>Все пользователи</span>
				</NavLink>
			</li>
		</ul>
	);
}
