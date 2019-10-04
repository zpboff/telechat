const MessageModel = require('../dataModel/message');
const ChatModel = require('../dataModel/chat');

const getMessages = async (chatId, from, to) => {
	var result = await MessageModel.find({ chatId }, null, { skip: from, limit: to });
	return result;
};

const getChatList = async userId => {
	var result = await ChatModel.find({ members: userId });
	return result;
};

const createChat = async model => {
	var schemaModel = new ChatModel({ ...model });
	var result = await schemaModel.save();
	return result;
};

module.exports = {
	getMessages,
	getChatList,
	createChat,
};
