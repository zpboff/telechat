import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default function withAuth(WrappedComponent) {
	var returnComponent = class extends Component {
		componentDidMount() {
			if (!this.props.isAuthenticated) {
				this.props.history.push('/login');
			}
		}

		componentWillReceiveProps(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.props.history.push('/login');
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};

	return withRouter(returnComponent);
}
