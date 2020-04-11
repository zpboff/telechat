import { Secret, AccessTokenExpiresIn } from '../constants/appSettings';
import { sign } from 'jsonwebtoken';
import { uuidv4 } from '../helpers/idHelper';
import { upsertSession, getSession } from './sessionProvider';
import { getUserById, createUser, getUser, getOriginUser } from './usersProvider';

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

	const signature = Secret;
	const expiresIn = AccessTokenExpiresIn;
	const expiresDate = new Date(Date.now() + expiresIn);

	const accessToken = sign({ payload }, signature, { expiresIn });

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

export default {
	signin,
	signup,
	refreshToken,
};
