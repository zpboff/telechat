import AuthStore from './authStore';
import UsersStore from './usersStore';
import ChatsStore from './chatStore';

export default class RootStore {
	constructor() {
		this.auth = new AuthStore(this);
		this.users = new UsersStore(this);
		this.chats = new ChatsStore(this);
	}
}
