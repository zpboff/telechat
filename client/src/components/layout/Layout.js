
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import Register from '../auth/Register';
import Navbar from './Navbar';
import LeftMenu from './leftMenu/LeftMenu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Layout extends Component {
	render() {
		const { isAuthenticated } = this.props;
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<div>
						{isAuthenticated && <LeftMenu isAuthenticated={isAuthenticated} />}
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/profile" component={Profile} />
						</Switch>
					</div>
				</div>
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
