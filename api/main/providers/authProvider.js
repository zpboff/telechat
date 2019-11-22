const UserModel = require('../../db/dataModel/user');
const SessionModel = require('../../db/dataModel/session');
const argon2 = require('argon2');
const AppSettings = require('../../constants/appSettings');
const jwt = require('jsonwebtoken');
const { uuidv4 } = require('../helpers/idHelper');

const signup = async user => {
	var userRecord = await UserModel.findOne({ email: user.email });
	if (userRecord) {
		throw new Error('Email занят');
	}
	var userModel = new UserModel({ ...user });
	userRecord = await userModel.save();

	return await generateToken(userRecord);
};

const signin = async user => {
	const userRecord = await UserModel.findOne({ email: user.email });

	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	const passwordsIsEquals = await argon2.verify(userRecord.password, user.password);

	if (passwordsIsEquals) {
		return await generateToken(userRecord);
	}

	throw new Error('Неверный пароль');
};

const signinAsUser = async user => {
	const { email } = user;

	const userRecord = await UserModel.findOne({ email });

	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	return await generateToken(userRecord);
};

const generateToken = async user => {
	const payload = {
		id: user._id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		initials: user.initials,
		birthDate: user.birthDate,
		avatar: user.avatar,
	};

	const signature = AppSettings.Secret;
	const expiresIn = AppSettings.AccessTokenExpiresIn;

	var accessToken = jwt.sign({ payload }, signature, { expiresIn: accessTokenExpiresIn });
	var refreshToken = uuidv4();

	var sessionModel = new SessionModel({
		userId: user._id,
		refreshToken,
	});

	await sessionModel.save();

	return {
		accessToken,
		refreshToken,
		expiresIn,
	};
};

module.exports = {
	signin,
	signup,
	signinAsUser,
};
