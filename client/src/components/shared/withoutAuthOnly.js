import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

function withoutAuthOnly(WrappedComponent) {
	return class extends Component {
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
}

export default withRouter(withoutAuthOnly)