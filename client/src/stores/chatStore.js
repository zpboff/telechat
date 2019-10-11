import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });

class ChatsStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable chatList = [];

	@action setChats = chats => {
		this.chatList = chats;
	};
}

export default ChatsStore;
