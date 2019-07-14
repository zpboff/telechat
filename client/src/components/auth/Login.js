import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { observer } from "mobx-react";

@observer
class Login extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
        }
    }

    handleInputChange = event => {
        const { value, name } = event.target;
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <div className="container">
                <div className="form-wrapper">
                    <form noValidate onSubmit={this.handleSubmit}>
                        <span className="form-title">Авторизация</span>
                        <div
                            data-validate={false}
                            className={classnames("input-wrapper", {
                                error: false
                            })}
                        >
                            <input
                                className="text-input"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={this.handleInputChange}
                                value={"1"}
                            />
                        </div>
                        <div
                            data-validate={false}
                            className={classnames("input-wrapper", {
                                error: false
                            })}
                        >
                            <input
                                className="text-input"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={this.handleInputChange}
                                value={2}
                            />
                        </div>
                        <div className="additional">
                            <div>
                                <NavLink to="/" className="notice">
                                    Забыли пароль?
                                </NavLink>
                            </div>
                        </div>
                        <div className="btn-wrapper">
                            <button>Вход</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
