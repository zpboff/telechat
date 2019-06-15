import React, { Component } from 'react';
import withAuth from '../shared/withAuth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			avatar: [],
			avatarPreview: ''
		};
	}

	_crop() {
		const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
		this.setState({ avatarPreview: dataUrl });
	}

	render() {
		return (
			<div>
				<Cropper
					ref="cropper"
					src="https://cdn-images-1.medium.com/max/1600/1*9lrxxiFyoHt0v5GWbYMwZg.png"
					style={{ height: 400, width: '100%' }}
					guides={false}
				/>
				<button onClick={this._crop.bind(this)}>Crop</button>
				<img src={this.state.avatarPreview} />
			</div>
		);
	}
}

Profile.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withAuth(Profile));
