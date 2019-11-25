const SessionModel = require('../dataModel/session');

const readSession = async ({ userId, refreshToken }) => {
	var result = await SessionModel.find({ userId, refreshToken });
	return result;
};

const deleteSession = async ({ userId, refreshToken }) => {
	await SessionModel.findOneAndRemove({ userId, refreshToken });
};

const createSession = async model => {
	const sessionModel = new SessionModel({ ...model });
	await sessionModel.save();
};

module.exports = {
	readSession,
	deleteSession,
	createSession,
};
