const UserModel = require('../dataModel/user');

const getUsers = async config => {
	const users = await UserModel.find(config);
	return users;
};

const getById = async id => {
	var result = await UserModel.findById(id);
	return result;
};

const updateById = async (id, changes) => {
	await UserModel.findByIdAndUpdate(id, { $set: changes });
};

module.exports = {
	getUsers,
	getById,
	updateById,
};
