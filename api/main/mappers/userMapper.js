var getMappedUser = userFromDb => {
	const { firstName, id, lastName, avatar, isOnline, birthDate, initials } = userFromDb;
	return {
		firstName,
		lastName,
		id,
		birthDate,
		initials,
		isOnline,
		avatar
	};
};

module.exports = {
	getMappedUser,
};
