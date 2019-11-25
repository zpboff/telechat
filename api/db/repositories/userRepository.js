const UserModel = require('../dataModel/user');

const read = async condition => {
	const users = await UserModel.find(condition);
	return users;
};

const readOne = async condition => {
	const user = await UserModel.findOne(condition);
	return user;
};

const readById = async id => {
	var result = await UserModel.findById(id);
	return result;
};

const updateById = async (id, changes) => {
	await UserModel.findByIdAndUpdate(id, { $set: changes });
};

const create = async model => {
	const userModel = new UserModel({ ...model });
	var result = await userModel.save();
	return result;
};

module.exports = {
	read,
	readById,
	readOne,
	updateById,
	create,
};
