import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import Register from "../auth/Register";
import LeftMenu from "./LeftMenu";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserList from "../users/UserList";

class Layout extends Component {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <BrowserRouter>
                <section className="layout">
                    {isAuthenticated && <LeftMenu />}
                    <section className="main">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/chats" component={Profile} />
                            <Route exact path="/friends" component={Profile} />
                            <Route exact path="/users" component={UserList} />
                            <Route exact path="/settings" component={Profile} />
                            <Route exact path="/calendar" component={Profile} />
                        </Switch>
                    </section>
                </section>
            </BrowserRouter>
        );
    }
}

Layout.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Layout);
