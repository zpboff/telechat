const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
	userId: { type: mongoose.Types.ObjectId, required: true },
	refreshToken: { type: String, required: true, unique: true },
	creationDate: { type: Date, default: new Date() },
	expiresDate: { type: Date },
});

module.exports = mongoose.model('sessions', SessionSchema);
