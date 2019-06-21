import React, { Component } from 'react';
import withAuth from '../shared/withAuth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Croppie from 'croppie';
import 'croppie/croppie.css';
import { croppieOptions } from '../../constants/consts';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			avatar: '',
			photo: ''
		};
		this.originalImage = React.createRef();
	}

	componentDidMount() {
		this.cropper = new Croppie(this.originalImage.current, croppieOptions);
	}

	getCroppedImage = () => {
		const args = { type: 'base64', size: 'viewport', format: 'webp', quality: 1, circle: true }
		this.cropper.result(args).then(value => {
			this.setState({ avatar: value })
		});
	}

	render() {
		return (
			<div className='profile-page'>
				<div className='avatar-wrapper'>
					<img ref={this.originalImage} src='https://foliotek.github.io/Croppie/demo/demo-1.jpg' alt='preview' />
				</div>
				<div className='btn-wrapper'>
					<button type='button' onClick={this.getCroppedImage}>Загрузить</button>
					<button type='button' onClick={this.getCroppedImage}>Сохранить</button>
				</div>
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
