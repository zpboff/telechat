var getMappedUser = userFromDb => {
	const { firstName, id, lastName, avatar, isOnline, birthDate, initials, friends } = userFromDb;
	return {
		firstName,
		lastName,
		id,
		birthDate,
		initials,
		isOnline,
		avatar,
		friends,
	};
};

module.exports = {
	getMappedUser,
};
