import AppBar from '@material-ui/core/AppBar';
import React, { Component } from 'react';
import AccountLinks from './AccountLinks';
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
			<div>
				NavBar
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
