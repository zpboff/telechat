import React, { Component } from 'react';
import FullMenuItems from './FullMenuItems';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LeftMenu extends Component {
	render() {
		const { avatar } = this.props;
		return (
			<nav tabIndex="0">
				<div/>
				<header>
					<img width='64' height='64' src={avatar} alt="Аватар" />
				</header>
				<FullMenuItems />
			</nav>
		);
	}
}

LeftMenu.propTypes = {
	avatar: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	avatar: state.auth.user.avatar
});

export default connect(mapStateToProps)(LeftMenu);
