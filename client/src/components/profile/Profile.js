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
}

Profile.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withAuth(Profile));
