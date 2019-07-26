import React from 'react';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';
import WithAuth from './shared/WithAuth';

@inject('auth')
@WithAuth
@observer
class Home extends React.Component {
	render() {
		return (
            <div>Home</div>
		);
	}
}

export default Home;
