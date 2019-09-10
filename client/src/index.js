import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import RootStore from './stores/rootStore';
import Layout from './components/layout/Layout';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

const rootStore = new RootStore();
window.rootStore = rootStore;
const browserHistory = createBrowserHistory();

ReactDOM.render(
	<Provider rootStore={rootStore} auth={rootStore.auth} users={rootStore.users}>
		<Router history={browserHistory}>
			<Layout />
		</Router>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
