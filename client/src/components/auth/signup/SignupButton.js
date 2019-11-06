import React from 'react';
import { signupStep } from './consts';

export default function SignupButton({ switchStep, step }) {
	if (step === Object.values(signupStep).length) {
		return <button type="submit">Зарегистрироваться</button>;
	}
	return (
		<button type="button" onClick={switchStep}>
			Следующий шаг
		</button>
	);
}
