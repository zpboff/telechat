var { updateById } = require('../../db/repositories/userRepository');

const updateStatus = async (id, isOnline) => {
	await updateById(id, { isOnline });
};

module.exports = {
	updateStatus,
};
