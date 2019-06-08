import AppBar from '@material-ui/core/AppBar';
import React, { Component } from 'react';
import UserLinks from './UserLinks';
import AuthLinks from './AuthLinks';
import { Toolbar, Typography } from '@material-ui/core';
import '../../styles/navbar.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuIsOpened: false
		};
	}

	render() {
		const { isAuthenticated } = this.props;
		return (
			<div className="grow">
				<AppBar className="navbar" position="static">
					<Toolbar>
						<NavLink to="/" className="home-link">
							<Typography variant="h6" className="">
								Telechat
							</Typography>
						</NavLink>
						<div className="section-desktop">{isAuthenticated ? <UserLinks /> : <AuthLinks />}</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
