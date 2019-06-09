import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default function withoutAuth(WrappedComponent) {
	var returnComponent = class extends Component {
		componentDidMount() {
			if (this.props.isAuthenticated) {
				this.props.history.push('/');
			}
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.isAuthenticated) {
				this.props.history.push('/');
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};

	return withRouter(returnComponent);
}
