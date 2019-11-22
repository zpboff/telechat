import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './components/Layout';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { AuthContextProvider } from './context/auth/context';

const browserHistory = createBrowserHistory();

ReactDOM.render(
	<AuthContextProvider>
		<Router history={browserHistory}>
			<Layout />
		</Router>
	</AuthContextProvider>,
	document.getElementById('root')
);

serviceWorker.unregister();
