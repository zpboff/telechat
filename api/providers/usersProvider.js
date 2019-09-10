const UserModel = require('../db/dataModel/user');
const { getMappedUser } = require('../mappers/userMapper');

const getAll = async () => {
	const users = await UserModel.find({});
	const result = users.map(getMappedUser);
	return result;
};

module.exports = {
	getAll,
};
