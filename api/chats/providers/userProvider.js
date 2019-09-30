var { updateByEmail } = require('../../db/repositories/userRepository');

const updateStatus = async (email, isOnline) => {
	await updateByEmail(email, { isOnline });
};

module.exports = {
	updateStatus,
};
