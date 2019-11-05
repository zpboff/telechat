const { getMappedUser } = require('../mappers/userMapper');
const { getUsers, getById } = require('../../db/repositories/userRepository');

const getFriends = async id => {
	const currentUser = await getUserById(id);
	const friends = await getUsers({ _id: { $in: currentUser.friends } });
	return friends.map(getMappedUser);
};

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
	getFriends,
	getAll,
	getUserById,
};
