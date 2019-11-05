import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './components/layout/Layout';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

const browserHistory = createBrowserHistory();

ReactDOM.render(
	<Router history={browserHistory}>
		<Layout />
	</Router>,
	document.getElementById('root')
);

serviceWorker.unregister();
