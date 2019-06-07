import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push("/");
        }
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

    onSubmit = event => {
        event.preventDefault();
        this.props.login({ ...this.state });
    };

    render() {
        var { email, password, errors } = this.state;
        return (
            <div className="container">
                <h5>Введите Email и пароль</h5>
                <form className="col s12" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={classnames("validate", {
                                    invalid: errors.email
                                })}
                                value={email}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="email">Email</label>
                            {errors.email && (
                                <span className="helper-text red lighten-1">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={classnames("validate", {
                                    invalid: errors.password
                                })}
                                value={password}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="password">Пароль</label>
                            {errors.password && (
                                <span className="helper-text red lighten-1">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">
                        Вход
                    </button>
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
)(withRouter(Login));
