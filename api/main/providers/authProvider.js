const argon2 = require('argon2');
const AppSettings = require('../../constants/appSettings');
const jwt = require('jsonwebtoken');
const { uuidv4 } = require('../helpers/idHelper');
const { upsertSession, getSession } = require('./sessionProvider');
const { getUserById, createUser, getUser } = require('./usersProvider');

const signup = async user => {
	var userRecord = await getUser({ email: user.email });

	if (userRecord) {
		throw new Error('Email занят');
	}

	var userRecord = await createUser({ ...user });

	return await generateToken(userRecord);
};

const signin = async user => {
	const userRecord = await getUser({ email: user.email });

	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	const passwordsIsEquals = await argon2.verify(userRecord.password, user.password);

	if (passwordsIsEquals) {
		return await generateToken(userRecord);
	}

	throw new Error('Неверный пароль');
};

const refreshToken = async ({ userId, refreshToken }) => {
	const session = await getSession(userId, refreshToken);

	if (session) {
		const user = await getUserById(userId);
		return signin(user);
	}

	throw new Error('Не возможно обновить сессию');
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
	const expiresDate = Date.now() + expiresIn;

	var accessToken = jwt.sign({ payload }, signature, { expiresIn });
	var refreshToken = uuidv4();

	await upsertSession({
		userId: user._id,
		refreshToken,
		expires: new Date(expiresDate),
	});

	return {
		accessToken,
		refreshToken,
		expiresDate,
	};
};

module.exports = {
	signin,
	signup,
	refreshToken,
};