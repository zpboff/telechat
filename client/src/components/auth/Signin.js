import React from 'react';
import { observer } from 'mobx-react-lite';
import signinModel from '../../models/signinModel';
import AuthProvider from '../../providers/authProvider';

const handelSubmit = event => {
	event.preventDefault();
	AuthProvider.Signin(signinModel);
};

const handleInputChange = event => {
	const { name, value } = event.target;
	signinModel.setField(name, value);
};

const Signin = observer(() => (
	<form noValidate onSubmit={handelSubmit}>
		<div>
			<input type="text" name="email" onChange={handleInputChange} value={signinModel.email} />
		</div>
		<div>
			<input type="password" name="password" onChange={handleInputChange} value={signinModel.password} />
		</div>
		<div>
			<button type="submit">Войти</button>
		</div>
	</form>
));

export default Signin;
