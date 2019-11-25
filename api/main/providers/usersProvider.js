const { getMappedUser } = require('../mappers/userMapper');
const { readOne, readById, create } = require('../../db/repositories/userRepository');

const getUserById = async id => {
	const user = await readById(id);
	const mappedUser = getMappedUser(user);
	return mappedUser;
};

const getUser = async condition => {
	const user = await readOne(condition);
	const mappedUser = getMappedUser(user);
	return mappedUser;
};

const createUser = async model => {
	var user = await create(model);
	return user;
};

module.exports = {
	getUserById,
	getUser,
	createUser,
};
