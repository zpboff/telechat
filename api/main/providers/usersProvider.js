const { getMappedUser } = require('../mappers/userMapper');
const { getUsers, getById } = require('../../db/repositories/userRepository');

const getAll = async id => {
	const users = await getUsers({ _id: { $ne: id } });
	const result = users.map(getMappedUser);
	return result;
};

const getUserById = async id => {
	const user = await getById(id);
	const result = getMappedUser(user);
	return result;
};

module.exports = {
	getAll,
	getUserById,
};
