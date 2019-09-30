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
	var user = await getById(id);
	var updatedUser = Object.assign(user, changes);
	await updatedUser.save();
};

const updateByEmail = async (email, changes) => {
	// UserModel.model('hello', UserModel.schema)
	var prom = UserModel.findByEmail(email)
	console.log(prom instanceof Promise)
	var user = await prom;
	var updatedUser = Object.assign(user, changes);
	await updatedUser.save();
};

module.exports = {
	getUsers,
	getById,
	updateById,
	updateByEmail,
};
