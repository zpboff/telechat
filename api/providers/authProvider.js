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
		user: {
			email: userRecord.email,
			firstName: userRecord.firstName,
			lastName: userRecord.lastName,
			birthDate: userRecord.birthDate,
			avatar: userRecord.avatar,
		},
	};
};

const signin = async user => {
	const userRecord = await UserModel.findOne({ email: user.email });
	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	const correctPassword = await argon2.verify(userRecord.password, user.password);
	
	if (!correctPassword) {
		throw new Error('Неверный пароль');
	}

	return {
		user: {
			email: userRecord.email,
			firstName: userRecord.firstName,
			lastName: userRecord.lastName,
			birthDate: userRecord.birthDate,
            avatar: userRecord.avatar,
            token: generateToken(userRecord)
		},
	};
};

const generateToken = user => {
	const data = {
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
	};
	const signature = AppSettings.Secret;
	const expiration = AppSettings.TokenExpiresIn;

	return jwt.sign({ data }, signature, { expiresIn: expiration });
};

module.exports = {
	signin,
	signup,
	generateToken
}