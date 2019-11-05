import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './components/layout/Layout';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { AuthProvider } from './context/Auth/context';

const browserHistory = createBrowserHistory();

ReactDOM.render(
	<AuthProvider>
		<Router history={browserHistory}>
			<Layout />
		</Router>
	</AuthProvider>,
	document.getElementById('root')
);

serviceWorker.unregister();
