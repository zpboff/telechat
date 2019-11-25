const { readSession, deleteSession, createSession } = require('../../db/repositories/sessionRepository');

async function upsertSession({ userId, refreshToken, expiresDate }) {
	const currentSession = await readSession(refreshToken);

	if (currentSession) {
		await deleteSession(refreshToken);
	}

	const session = await createSession({ userId, refreshToken, expiresDate });
	return session;
}

async function getSession(refreshToken) {
	const session = await readSession(refreshToken);
	return session;
}

module.exports = {
	upsertSession,
	getSession,
};
