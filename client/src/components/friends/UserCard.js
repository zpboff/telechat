import React from 'react';
import cn from 'classnames';
import Icon from '../shared/Icon';
import { NavLink } from 'react-router-dom';

export default function UserCard({ user }) {
	return (
		<div className={cn('card')}>
			<div className="main">
				<NavLink to={`/userinfo/${user.id}`}>
					<div className="user-card">
						<img src="./images/avatar.svg" alt="Аватар" />
						<div className="status">{user.isOnline ? "В сети" : "Не в сети"}</div>
					</div>
				</NavLink>
				<div className="more-info">
					<h1>{`${user.firstName}`}</h1>
					<div className="coords title">
						<span>Дата рождения</span>
						<span>2019-09-11</span>
					</div>
					<div className="coords">
						<span>Город</span>
						<span>Тула</span>
					</div>
					<div className="stats">
						<div>
							<Icon icon="people" />
							<div className="value">123</div>
						</div>
					</div>
				</div>
			</div>
			<div className="general">
				<h1>{`${user.firstName}`}</h1>
				<p>Статус</p>
			</div>
		</div>
	);
}
