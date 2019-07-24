const UserModel = require('../db/dataModel/user');
const argon2 = require('argon2');
const AppSettings = require('../constants/appSettings');
const jwt = require('jsonwebtoken');

const signup = async user => {
	var userRecord = await UserModel.findOne({ email: user.email });
	if (userRecord) {
		throw new Error('Email занят');
	}
	var userModel = new UserModel({ ...user });
	userRecord = await userModel.save();

	return generateToken(userRecord);
};

const signin = async user => {
	const userRecord = await UserModel.findOne({ email: user.email });
	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	const passwordsIsEquals = await argon2.verify(userRecord.password, user.password);
	if (passwordsIsEquals) {
		return generateToken(userRecord);
	}
	throw new Error('Неверный пароль');
};

const signinAsUser = async email => {
	const userRecord = await UserModel.findOne({ email });

	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	return generateToken(userRecord);
};

const generateToken = user => {
	const data = {
		_id: user._id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		initials: user.initials,
		birthDate: user.birthDate,
		avatar: user.avatar,
	};
	const signature = AppSettings.Secret;
	const expiration = AppSettings.TokenExpiresIn;

	return jwt.sign({ data }, signature, { expiresIn: expiration });
};

module.exports = {
	signin,
	signup,
	signinAsUser,
};
