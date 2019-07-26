import React from 'react';
import { observer } from 'mobx-react-lite';
import signupModel from '../../models/signupModel';
import AuthProvider from '../../providers/authProvider';
import WithoutAuth from '../shared/WithoutAuth';
import { inject } from 'mobx-react';

const handelSubmit = event => {
	event.preventDefault();
	AuthProvider.Signup(signupModel);
};

const handleInputChange = event => {
	const { name, value } = event.target;
	signupModel.setField(name, value);
};

@inject('auth')
@WithoutAuth
@observer
class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.handelSubmit = this.handelSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handelSubmit(event) {
		event.preventDefault();
		this.props.auth.signup(signupModel);
	}

	handleInputChange(event) {
		const { name, value } = event.target;
		signupModel.setField(name, value);
	}

	render() {
		return (
			<form noValidate onSubmit={handelSubmit}>
				<div>
					<input type="text" name="email" onChange={handleInputChange} value={signupModel.email} />
				</div>
				<div>
					<input type="password" name="password" onChange={handleInputChange} value={signupModel.password} />
				</div>
				<div>
					<input
						type="password"
						name="passwordConfirmation"
						onChange={handleInputChange}
						value={signupModel.passwordConfirmation}
					/>
				</div>
				<div>
					<input type="text" name="firstName" onChange={handleInputChange} value={signupModel.firstName} />
				</div>
				<div>
					<input type="text" name="lastName" onChange={handleInputChange} value={signupModel.lastName} />
				</div>
				<div>
					<button type="submit">Зарегистрироваться</button>
				</div>
			</form>
		);
	}
}

export default Signup;
