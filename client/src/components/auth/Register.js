import React, { Component } from "react";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import withoutAuth from "../shared/withoutAuth";
import classnames from "classnames";
import Enums from "../../constants/enums";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: Enums.RegisterStep.Credentials,
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            passwordConfirm: "",
            errors: {}
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: ""
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.register({ ...this.state }, this.props.history);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            const { email, password, passwordConfirm } = nextProps.errors;
            const stepWithError =
                email || password || passwordConfirm
                    ? Enums.RegisterStep.Credentials
                    : Enums.RegisterStep.Personal;

            this.setState({
                errors: nextProps.errors,
                step: stepWithError
            });
        }
    }

    swithStep = step => this.setState({ step });

    renderButton = () => {
        const {
            step,
            email,
            password,
            passwordConfirm,
            lastName,
            firstName,
            errors
        } = this.state;
        var disabled = false;

        switch (step) {
            case Enums.RegisterStep.Credentials:
                disabled = !email || !password || !passwordConfirm;
            case Enums.RegisterStep.Personal:
                disabled = !lastName || !firstName;
            default:
                disabled = false;
        }

        const nextStep = Math.min(
            Object.values(Enums.RegisterStep).length,
            step + 1
        );

        if (step === nextStep) {
            return <button type="submit">Зарегистрироваться</button>;
        }
        return (
            <button
                key={step}
                type="button"
                disabled={disabled}
                onClick={this.swithStep.bind(this, nextStep)}
            >
                Следующий шаг
            </button>
        );
    };

    renderSwitcher = () => {
        const { step } = this.state;
        return (
            <div className="steps-wrapper">
                {Object.values(Enums.RegisterStep).map(x => (
                    <span
                        key={x}
                        disabled={x === step}
                        onClick={this.swithStep.bind(this, x)}
                        className={classnames("step", {
                            current: x === step
                        })}
                    />
                ))}
            </div>
        );
    };

    credentials = () => {
        var { email, password, passwordConfirm, errors } = this.state;
        return (
            <>
                <div
                    data-validate={errors.email}
                    className={classnames("input-wrapper", {
                        error: errors.email
                    })}
                >
                    <input
                        className="text-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleInputChange}
                        value={email}
                    />
                </div>
                <div
                    data-validate={errors.password}
                    className={classnames("input-wrapper", {
                        error: errors.password
                    })}
                >
                    <input
                        className="text-input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={this.handleInputChange}
                        value={password}
                    />
                </div>
                <div
                    data-validate={errors.password}
                    className={classnames("input-wrapper", {
                        error: errors.password
                    })}
                >
                    <input
                        className="text-input"
                        type="password"
                        name="passwordConfirm"
                        placeholder="Подтверждение пароля"
                        onChange={this.handleInputChange}
                        value={passwordConfirm}
                    />
                </div>
            </>
        );
    };

    personal = () => {
        var { firstName, lastName, errors } = this.state;
        return (
            <>
                <div
                    data-validate={errors.firstName}
                    className={classnames("input-wrapper", {
                        error: errors.firstName
                    })}
                >
                    <input
                        className="text-input"
                        type="text"
                        name="firstName"
                        placeholder="Имя"
                        onChange={this.handleInputChange}
                        value={firstName}
                    />
                    <span className="error" />
                </div>
                <div
                    data-validate={errors.lastName}
                    className={classnames("input-wrapper", {
                        error: errors.lastName
                    })}
                >
                    <input
                        className="text-input"
                        type="text"
                        name="lastName"
                        placeholder="Фамилия"
                        onChange={this.handleInputChange}
                        value={lastName}
                    />
                    <span className="warning" />
                </div>
            </>
        );
    };

    getBody = () => {
        switch (this.state.step) {
            case Enums.RegisterStep.Credentials:
                return this.credentials();
            case Enums.RegisterStep.Personal:
                return this.personal();
            default:
                return <div>Wrong step!</div>;
        }
    };

    render() {
        return (
            <div className="container">
                <div className="form-wrapper">
                    <form noValidate onSubmit={this.handleSubmit}>
                        <span className="form-title">Регистрация</span>
                        {this.getBody()}
                        <div className="btn-wrapper">{this.renderButton()}</div>
                        {this.renderSwitcher()}
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    errors: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors
});

const mapDispatchToProps = dispatch => ({
    register: (user, history) => dispatch(register(user, history))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withoutAuth(Register));
