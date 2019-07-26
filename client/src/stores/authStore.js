import { observable, configure, action, computed } from 'mobx';
import AuthProvider from '../providers/authProvider';
import jwt_decode from 'jwt-decode';

configure({ enforceActions: 'always' });

class AuthStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable token = '';
	@observable socketId = '';
	@observable firstName = '';
	@observable lastName = '';
	@observable initials = '';
	@observable avatar = '';
	@observable birthDate = new Date();

	@computed get isAuthenticated() {
		return !!this.token;
	}

	@action signin(user) {
		AuthProvider.Signin(user, token => {
			const decodedIdentity = jwt_decode(token).data;
			this.setUser({ ...decodedIdentity, token });
		});
	}

	@action setUser(user) {
		this.token = user.token;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.initials = user.initials;
		this.avatar = user.avatar;
	}
}

export default AuthStore;
