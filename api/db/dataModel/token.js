const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
	email: { type: String, required: true },
	refreshToken: { type: String, required: true, unique: true },
	creationDate: { type: Date, default: Date.now },
	expirationDate: { type: Date },
});

module.exports = mongoose.model('tokens', TokenSchema);
