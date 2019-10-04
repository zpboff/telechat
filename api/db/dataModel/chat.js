const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	createDate: { type: Date, default: Date.now },
	title: { type: String, required: true },
	members: { type: [mongoose.Types.ObjectId] },
});

module.exports = mongoose.model('chats', ChatSchema);
