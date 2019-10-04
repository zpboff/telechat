const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	date: { type: Date, default: Date.now },
	text: { type: String, required: true },
	userId: { type: mongoose.Types.ObjectId, required: true },
	chatId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('messages', MessageSchema);
