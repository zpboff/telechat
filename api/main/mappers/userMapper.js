var getMappedUser = userFromDb => {
	const { firstName, email, id } = userFromDb;
	return {
		firstName,
		email,
		id
	};
};

module.exports = {
	getMappedUser,
};
