import React from 'react';
import { observer } from 'mobx-react-lite';
import loginModel from '../../models/signinModel';
import AuthProvider from '../../providers/authProvider';

const handelSubmit = event => {
	event.preventDefault();
	AuthProvider.Signin(loginModel);
};

const handleInputChange = event => {
	const { name, value } = event.target;
	loginModel.setField(name, value);
};

const Signin = observer(() => (
	<form noValidate onSubmit={handelSubmit}>
		<div>
			<input type="text" name="email" onChange={handleInputChange} value={loginModel.email} />
		</div>
		<div>
			<input type="password" name="password" onChange={handleInputChange} value={loginModel.password} />
		</div>
		<div>
			<button type="submit">Войти</button>
		</div>
	</form>
));

export default Signin;
