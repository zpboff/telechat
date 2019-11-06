import React from 'react';
import Credentials from './Credentials';
import Personal from './Personal';
import { signupStep } from './consts';

export default function SignupBody({ inputChanger, step }) {
	const props = { inputChanger };
	switch (step) {
		case signupStep.Personal:
			return <Personal {...props} />;
		default:
			return <Credentials {...props} />;
	}
}
