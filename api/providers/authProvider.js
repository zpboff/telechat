const UserModel = require('../db/dataModel/user');
const argon2 = require('argon2');
const AppSettings = require('../constants/appSettings');
const jwt = require('jsonwebtoken');

const signup = async user => {
	var userRecord = await UserModel.findOne({ email: user.email });
	if (userRecord) {
		throw new Error('Email занят');
	}
	userRecord = await new UserModel({ ...user }).save();

	return {
		_id: userRecord._id,
		email: userRecord.email,
		firstName: userRecord.firstName,
		lastName: userRecord.lastName,
		initials: userRecord.initials,
		birthDate: userRecord.birthDate,
		avatar: userRecord.avatar,
		token: generateToken(userRecord),
	};
};

const signin = async user => {
	const userRecord = await UserModel.findOne({ email: user.email });
	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	if (await argon2.verify(userRecord.password, user.password)) {
		return {
			_id: userRecord._id,
			email: userRecord.email,
			firstName: userRecord.firstName,
			lastName: userRecord.lastName,
			initials: userRecord.initials,
			birthDate: userRecord.birthDate,
			avatar: userRecord.avatar,
			token: generateToken(userRecord),
		};
	}
	
	throw new Error('Неверный пароль');
};

const signinAsUser = async email => {
	const userRecord = await UserModel.findOne({ email });

	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	return {
		_id: userRecord._id,
		email: userRecord.email,
		firstName: userRecord.firstName,
		lastName: userRecord.lastName,
		initials: userRecord.initials,
		birthDate: userRecord.birthDate,
		avatar: userRecord.avatar,
		token: generateToken(userRecord),
	};
};

const generateToken = user => {
	const data = {
		_id: user._id,
		email: userRecord.email,
		firstName: userRecord.firstName,
		lastName: userRecord.lastName,
		initials: userRecord.initials,
		birthDate: userRecord.birthDate,
		avatar: userRecord.avatar,
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
