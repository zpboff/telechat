import React, { Component } from 'react';
import withAuth from '../shared/withAuth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			avatar: [],
			avatarPreview: ''
		};
	}

	render() {
		return (
			<div>
				{this.props.birthDate}
			</div>
		);
	}
}

Profile.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	birthDate: state.auth.user.birthDate
});

export default connect(mapStateToProps)(withAuth(Profile));
