import React from 'react';

export default function UserCard({ user }) {
	return (
		<div className="card">
			<div className="main">
				<div className="user-card">
					<div className="status">Онлайн</div>
					<div className="avatar">Заглушка для аватара</div>
				</div>
				<div className="more-info">
					<h1>{`${user.firstName}`}</h1>
					<div className="coords">
						<span>Дата рождения</span>
						<span>Город</span>
					</div>
					<div className="stats">
						<div>
							<div className="title">Друзья</div>
							<i className="fa fa-group"></i>
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
