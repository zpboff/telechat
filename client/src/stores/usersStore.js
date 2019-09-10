import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });

class UsersStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable userList = [];

	@action setUsers = users => {
		this.userList = users;
	};
}

export default UsersStore;
