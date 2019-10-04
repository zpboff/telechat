const chatRepository = require('../../db/repositories/chatRepository');

const getLastMessages = async chatId => {
	const from = 0;
	const size = 10;
	var messages = await chatRepository.getMessages(chatId, from, size);
	return messages;
};

const createChat = async model => {
	var chat = await chatRepository.createChat(model);
	return chat.id;
};

module.exports = {
	getLastMessages,
	createChat,
};
