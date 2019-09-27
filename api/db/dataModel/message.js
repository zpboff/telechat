const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	dispatchDate: { type: Date, default: Date.now },
	text: { type: String, required: true },
	sender: { type: mongoose.Types.ObjectId, required: true },
	chatId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('messages', MessageSchema);
