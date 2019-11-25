const { readSession, deleteSession, createSession } = require('../../db/repositories/sessionRepository');

async function upsertSession({ userId, refreshToken, expiresDate }) {
	const currentSession = await readSession(userId, refreshToken);
	if (currentSession) {
		await deleteSession(userId, refreshToken);
	}
	const session = await createSession({ user, refreshToken, expiresDate });
	return session;
}

async function getSession(userId, refreshToken) {
	const session = await readSession(userI, refreshToken);
	return session;
}

module.exports = {
	upsertSession,
	getSession,
};
