const UserModel = require('../db/dataModel/user');
const { getMappedUser } = require('../mappers/userMapper');

const getAll = async id => {
	const users = await UserModel.find({ _id: { $ne: id } });
	const result = users.map(getMappedUser);
	return result;
};

const getCurrent = async id => {
	const user = await UserModel.findById(id);
	const result = getMappedUser(user);
	return result;
};

module.exports = {
	getAll,
	getCurrent,
};
