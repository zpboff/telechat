import React from 'react';

export default function SignupButton({ switchStep }) {
	if (true) {
		return (
			<button type="button" onClick={switchStep}>
				Следующий шаг
			</button>
		);
	}
	return <button type="submit">Зарегистрироваться</button>;
}
