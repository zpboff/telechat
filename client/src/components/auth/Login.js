import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import withoutAuth from "../shared/withoutAuth";
import classnames from 'classnames';

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
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: ''
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.login({ ...this.state });
    };

    render() {
        const { email, errors, password } = this.state;
        return (
            <div className="container">
                <div className="form-wrapper">
                    <form noValidate onSubmit={this.handleSubmit}>
                        <span className="form-title">Авторизация</span>
                        <div data-validate={errors.email} className={classnames("input-wrapper", {
                            'error': errors.email
                        })}>
                            <input
                                className="text-input"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={this.handleInputChange}
                                value={email}
                            />
                        </div>
                        <div data-validate={errors.password} className={classnames("input-wrapper", {
                            'error': errors.password
                        })}>
                            <input
                                className="text-input"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={this.handleInputChange}
                                value={password}
                            />
                        </div>
                        <div className="additional">
                            <div className="checkbox-wrapper">
                                <input
                                    id='remember'
                                    type="checkbox"
                                    name="remember"
                                />
                                <label htmlFor="remember">
                                    Запомнить меня
                                </label>
                            </div>
                            <div>
                                <NavLink to='/' className='notice'>
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
