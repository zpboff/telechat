import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import Register from '../auth/Register';
import Navbar from './Navbar';
import { Container } from '@material-ui/core';
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
					<div className='main'>
						{isAuthenticated && <LeftMenu isAuthenticated={isAuthenticated} />}
						<Container maxWidth="lg">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/profile" component={Profile} />
							</Switch>
						</Container>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

Layout.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Layout);
