import React, { Component } from 'react';
import withAuth from '../shared/withAuth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Croppie from 'croppie';
import 'croppie/croppie.css'

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			avatar: ''
		};
		this.originalImage = React.createRef();
	}

	componentDidMount() {
		const opts = {
			enableResize: true,
			viewport: {
				width: 100,
				height: 100,
				type: 'square'
			}
		}
		this.cropper = new Croppie(this.originalImage.current, opts);
	}

	getCroppedImage = () => {
		const args = { type: 'base64', size: 'viewport', format: 'webp', quality: 1, circle: true }
		this.cropper.result(args).then(value => {
			this.setState({ avatar: value })
		});
	}

	render() {
		return (
			<div>
				{this.props.birthDate}
				<img ref={this.originalImage} src='https://foliotek.github.io/Croppie/demo/demo-1.jpg' alt='preview' />
				<button type='button' onClick={this.getCroppedImage}>Загрузить</button>
				{this.state.avatar && <img src={this.state.avatar} alt='avatar' />}
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
