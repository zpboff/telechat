import React, { useState } from 'react';
import cn from 'classnames';
import Icon from '../shared/Icon';

export default function UserCard({ user }) {
	const [isActive, setActive] = useState(false);

	const toggleFlag = () => {
		setActive(!isActive);
	};

	return (
		<div
			className={cn('card', {
				active: isActive,
			})}
		>
			<div className="main">
				<div className="user-card" onClick={toggleFlag}>
					<img src="./images/avatar.svg" alt="Аватар" />
					<div className="status">Онлайн</div>
				</div>
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
