import React, { Component } from 'react';
import { observer } from 'mobx-react';
import signinModel from '../../models/signinModel';
import WithoutAuth from '../shared/WithoutAuth';
import { inject } from 'mobx-react';
import { withRouter } from "react-router";

@inject('auth')
@WithoutAuth
@withRouter
@observer
class Signin extends Component {
	constructor(props) {
		super(props);
		this.handelSubmit = this.handelSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handelSubmit(event) {
		event.preventDefault();
		this.props.auth.signin(signinModel);
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
