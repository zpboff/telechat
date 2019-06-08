import React, { Component } from 'react';

export default function withAuth(WrappedComponent) {
	return class extends Component {
		componentWillMount() {
			if (!localStorage.jwtToken) {
				window.location.href = '/login';
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
}
