import React from 'react';
import { observer } from 'mobx-react-lite';
import signupModel from '../../models/signupModel';

const handelSubmit = event => {
    event.preventDefault();
    console.log(event);
};

const handleInputChange = event => {
	const { name, value } = event.target;
	signupModel.setField(name, value);
};

const Signup = observer(() => (
	<form noValidate onSubmit={handelSubmit}>
		<div>
			<input type="text" name="email" onChange={handleInputChange} value={signupModel.email} />
		</div>
		<div>
			<input type="password" name="password" onChange={handleInputChange} value={signupModel.password} />
		</div>
		<div>
			<button type="submit">Войти</button>
		</div>
	</form>
));

export default Signup;
