var getMappedUser = userFromDb => {
	const { firstName } = userFromDb;
	return {
		firstName,
	};
};

module.exports = {
	getMappedUser,
};
