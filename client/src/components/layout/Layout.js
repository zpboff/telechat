import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Router, Route, Switch  } from 'react-router';
import { NavLink  } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import Signin from '../auth/Signin';
import Signup from '../auth/Signup';
import NotFound from '../shared/NotFound';
import Home from '../Home';
import AuthProvider from '../../providers/authProvider';

@inject('user')
@observer
class Layout extends Component {

	componentDidMount() {
		if(AuthProvider.GetAuthToken()){
			this.props.user.signin();
		}
	}

	render() {
		return (
			<div>
				<Router history={createBrowserHistory()}>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" component={Signin} />
						<Route path="/signup" component={Signup} />
						<Route component={NotFound} />
					</Switch>
                    <NavLink to="/" activeClassName="active">Главная</NavLink>  
                    <NavLink to="/signin" activeClassName="active">Вход</NavLink>  
                    <NavLink to="/signup" activeClassName="active">Регистрация</NavLink>
				</Router>
			</div>
		);
	}
}

export default Layout;
