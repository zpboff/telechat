import React from 'react';
import { observer } from 'mobx-react-lite';
import signupModel from '../../models/signupModel';
import AuthProvider from '../../providers/authProvider';

const handelSubmit = event => {
    event.preventDefault();
	AuthProvider.Signup(signupModel);
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
			<input type="password" name="passwordConfirmation" onChange={handleInputChange} value={signupModel.passwordConfirmation} />
		</div>
		<div>
			<input type="text" name="firstName" onChange={handleInputChange} value={signupModel.firstName} />
		</div>
		<div>
			<input type="text" name="lastName" onChange={handleInputChange} value={signupModel.lastName} />
		</div>
		{/* <div>
			<input type="text" name="birthDate" onChange={handleInputChange} value={signupModel.birthdate} />
		</div> */}
		<div>
			<button type="submit">Зарегистрироваться</button>
		</div>
	</form>
));

export default Signup;
