import React from 'react';
import { getProps } from './signupLogic';
import Credentials from './Credentials';
import Personal from './Personal';

export default function SignupBody({ onChange }) {
	const props = Object.assign(getProps({}), { onChange });
	const Body = true ? Credentials : Personal;
	return <Body {...props} />;
}
