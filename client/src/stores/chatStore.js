import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });

class ChatsStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable chatList = [];
	@observable currentChat = null;

	@action setChats = chats => {
		this.chatList = chats;
	};

	@action selectChat = chatId => {
		const selectedChat = this.chatList.find(x => x.id === chatId)
		this.currentChat = selectedChat;
	};
}

export default ChatsStore;
