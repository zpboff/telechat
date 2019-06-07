import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logout } from '../../actions/auth';
import { NavLink, withRouter } from 'react-router-dom';

class AccountLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null
		};
	}

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	logout = () => {
		this.props.logout(this.props.history);
	}

	render() {
		const { anchorEl } = this.state;
		return (
			<div>
				<IconButton
					edge="end"
					aria-label="Account of current user"
					aria-controls="profile"
					aria-haspopup="true"
					onClick={this.handleClick}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<Menu id="profile" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={this.handleClose}>
					<MenuItem>
						<NavLink to="/profile">
                            Профиль
						</NavLink>
					</MenuItem>
					<MenuItem onClick={this.logout}>Выход</MenuItem>
				</Menu>
			</div>
		);
	}
}

AccountLinks.propTypes = {
	initials: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	return {
		initials: state.auth.user.initials,
		avatar: state.auth.user.avatar
	};
};

const mapDispatchToProps = (dispatch) => ({
	logout: (history) => dispatch(logout(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountLinks));
