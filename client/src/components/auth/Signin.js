import React, { Component } from "react";
import { observer } from "mobx-react";
import signinModel from "../../models/signinModel";
import WithoutAuth from "../shared/WithoutAuth";
import { inject } from "mobx-react";
import { withRouter } from "react-router";

@inject("auth")
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
            <div className="login-form">
                <form noValidate onSubmit={this.handelSubmit}>
                    <img src="./images/avatar.svg" />
                    <h1>Вход</h1>
                    <p>Email</p>
                    <input
                        type="text"
                        name="email"
                        placeholder="Введите email"
                        onChange={this.handleInputChange}
                        value={signinModel.email}
                    />
                    <p>Пароль</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        onChange={this.handleInputChange}
                        value={signinModel.password}
                    />
                    <button type="submit">Войти</button>
                    <a href="#">Забыли пароль?</a>
                    <a href="#">Нет учетной записи?</a>
                </form>
            </div>
        );
    }
}

export default Signin;
