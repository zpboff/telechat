const SessionModel = require('../dataModel/session');

const readSession = async refreshToken => {
	var result = await SessionModel.findOne({ refreshToken });
	return result;
};

const deleteSession = async refreshToken => {
	await SessionModel.findOneAndRemove({ refreshToken });
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
