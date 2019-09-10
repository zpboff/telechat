import AuthStore from './authStore';
import UsersStore from './usersStore';

export default class RootStore {
	constructor() {
		this.auth = new AuthStore(this);
		this.users = new UsersStore(this);
	}
}
