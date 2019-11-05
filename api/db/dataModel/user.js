const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	birthDate: { type: Date },
	registrationDate: { type: Date, default: Date.now },
	initials: { type: String },
	avatar: { type: String },
	chats: { type: Array },
	isOnline: { type: Boolean, default: false },
	friends: { type: Array, default: [] },
});

UserSchema.pre('save', async function(next) {
	if (this.isNew || this.isModified('password')) {
		const document = this;
		document.initials = document.firstName[0] + document.lastName[0];
		const passwordHashed = await argon2.hash(document.password);
		document.password = passwordHashed;
	}
	next();
});

UserSchema.static('findByEmail', function(email) {
	var result = this.find({ email });
	return result;
});

module.exports = mongoose.model('users', UserSchema);
