import React from 'react';
import { observer } from 'mobx-react';
import signinModel from '../../models/signinModel';
import AuthProvider from '../../providers/authProvider';
import { inject } from 'mobx-react';
import WithoutAuth from '../shared/WithoutAuth';

@inject('user')
@WithoutAuth
@observer
class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.handelSubmit = this.handelSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handelSubmit(event) {
		event.preventDefault();
		AuthProvider.Signin(signinModel, user => {
			this.props.user.signin(user);
		});
	}

	handleInputChange(event) {
		const { name, value } = event.target;
		signinModel.setField(name, value);
	}

	render() {
		return (
			<form noValidate onSubmit={this.handelSubmit}>
				<div>
					<input type="text" name="email" onChange={this.handleInputChange} value={signinModel.email} />
				</div>
				<div>
					<input
						type="password"
						name="password"
						onChange={this.handleInputChange}
						value={signinModel.password}
					/>
				</div>
				<div>
					<button type="submit">Войти</button>
				</div>
			</form>
		);
	}
}

export default Signin;
