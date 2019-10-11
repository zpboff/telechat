const chatRepository = require('../../db/repositories/chatRepository');
const { getMappedChat } = require('../mappers/chatMapper');

const getLastMessages = async chatId => {
	const from = 0;
	const size = 10;
	var messages = await chatRepository.getMessages(chatId, from, size);
	return messages;
};

const getOrCreateChat = async model => {
	var chat = await chatRepository.getChat(model.members);
	if (!chat.length) {
		chat = await chatRepository.createChat(model);
	}
	return chat.id;
};

const getChatList = async userId => {
	const chatList = await chatRepository.getChatList(userId);
	const mappedChatList = chatList.map(getMappedChat);
	return mappedChatList;
};

module.exports = {
	getLastMessages,
	getOrCreateChat,
	getChatList,
};
