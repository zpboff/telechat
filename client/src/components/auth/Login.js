import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "../../styles/auth.css";
import InputWithError from "../shared/InputWithError";
import withoutAuth from "../shared/withoutAuth";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    handeSubmit = event => {
        event.preventDefault();
        this.props.login({ ...this.state });
    };

    render() {
        const { email, errors, password } = this.state;
        return (
            <div className="paper">
                <i className="material-icons icon-image-preview">account_circle</i>
                <h4 className="mdc-typography--headline4">Вход</h4>
                <form onSubmit={this.handeSubmit}>
                    <InputWithError
                        handleInputChange={this.handleInputChange}
                        value={email}
                        inputError={errors.email}
                        type="text"
                        id="email"
                        label="Email"
                    />
                    <InputWithError
                        handleInputChange={this.handleInputChange}
                        value={password}
                        inputError={errors.password}
                        type="password"
                        id="password"
                        label="Пароль"
                    />
                    <button className="mdc-button" type="submit" className="submit">
                        <span className="mdc-button__label">Вход</span>
                    </button>
                    <div>
                        <NavLink to="/recover">Забыли пароль?</NavLink>
                        <NavLink to="/register">
                            Нет аккаунта? Регистрация
                        </NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    errors: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withoutAuth(Login));
