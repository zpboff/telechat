import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import Home from '../home/Home';
import Register from '../auth/Register';
import Navbar from './Navbar';

class Layout extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                    <div className="dashboard container">
                        <div className="row">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Layout;