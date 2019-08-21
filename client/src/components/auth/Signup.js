import React, { Component } from 'react';
import { observer } from 'mobx-react';
import signupModel from '../../models/signupModel';
import WithoutAuth from '../shared/WithoutAuth';
import { inject } from 'mobx-react';

@inject('auth')
@WithoutAuth
@observer
class Signup extends Component {
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
			<form noValidate onSubmit={this.handelSubmit}>
				<div>
					<input type="text" name="email" onChange={this.handleInputChange} value={signupModel.email} />
				</div>
				<div>
					<input type="password" name="password" onChange={this.handleInputChange} value={signupModel.password} />
				</div>
				<div>
					<input
						type="password"
						name="passwordConfirmation"
						onChange={this.handleInputChange}
						value={signupModel.passwordConfirmation}
					/>
				</div>
				<div>
					<input type="text" name="firstName" onChange={this.handleInputChange} value={signupModel.firstName} />
				</div>
				<div>
					<input type="text" name="lastName" onChange={this.handleInputChange} value={signupModel.lastName} />
				</div>
				<div>
					<button type="submit">Зарегистрироваться</button>
				</div>
			</form>
		);
	}
}

export default Signup;
