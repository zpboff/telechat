import React, { Component } from "react";
import classnames from "classnames";
import { connect } from 'react-redux'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
            socket: null
        };
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.on('LOGIN', (data) => {
            if(data.errors){
                alert('Error happened')
            }
        })
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        const { socket } = this.props;
        socket.emit("LOGIN", { ...this.state });
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
                    <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                    >
                        Вход
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    socket: state.chat.socket
});

export default connect(mapStateToProps)(Login);
