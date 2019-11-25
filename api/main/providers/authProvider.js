const argon2 = require('argon2');
const AppSettings = require('../../constants/appSettings');
const jwt = require('jsonwebtoken');
const { uuidv4 } = require('../helpers/idHelper');
const { upsertSession, getSession } = require('./sessionProvider');
const { getUserById, createUser, getUser, getOriginUser } = require('./usersProvider');

const signup = async user => {
	const userRecord = await getUser({ email: user.email });

	if (userRecord) {
		throw new Error('Email занят');
	}

	const userModel = await createUser({ ...user });

	return await generateToken(userModel);
};

const signin = async user => {
	const userRecord = await getOriginUser({ email: user.email });

	if (!userRecord) {
		throw new Error('Пользователь не найден');
	}

	const passwordsIsEquals = await argon2.verify(userRecord.password, user.password);

	if (passwordsIsEquals) {
		return await generateToken(userRecord);
	}

	throw new Error('Неверный пароль');
};

const refreshToken = async ({ body }) => {
	const { refreshToken } = body;

	const session = await getSession(refreshToken);

	if (session) {
		const user = await getUserById(session.userId);
		return await generateToken(user, refreshToken);
	}

	throw new Error('Не возможно обновить сессию');
};

const generateToken = async (user, refreshToken = uuidv4()) => {
	const payload = {
		id: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		initials: user.initials,
		birthDate: user.birthDate,
		avatar: user.avatar,
	};

	const signature = AppSettings.Secret;
	const expiresIn = AppSettings.AccessTokenExpiresIn;
	const expiresDate = new Date(Date.now() + expiresIn);

	const accessToken = jwt.sign({ payload }, signature, { expiresIn });

	await upsertSession({
		userId: user.id,
		refreshToken,
		expiresDate,
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
