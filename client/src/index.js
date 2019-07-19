import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import RootStore from './stores/rootStore';
import Layout from './components/layout/Layout';

const rootStore = new RootStore();

ReactDOM.render(
	<Provider rootStore={rootStore} user={rootStore.user}>
		<Layout />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
