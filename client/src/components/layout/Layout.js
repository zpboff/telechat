import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Route, Switch } from "react-router";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
import NotFound from "../shared/NotFound";
import Home from "../Home";
import AuthProvider from "../../providers/authProvider";
import Header from "./Header";
import Logout from "../auth/Logout";
import Error from "../shared/Error";
import LeftMenu from "./LeftMenu/LeftMenu";

@inject("auth")
@observer
class Layout extends Component {
    componentDidMount() {
        if (AuthProvider.GetAuthToken()) {
            this.props.auth.signin();
        }
    }

    render() {
        var isAuth = this.props.auth.isAuthenticated;
        return (
            <div>
                <Header />
                <section className="layout">
                    {isAuth && <LeftMenu />}
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/error" component={Error} />
                        <Route component={NotFound} />
                    </Switch>
                </section>
            </div>
        );
    }
}

export default Layout;
