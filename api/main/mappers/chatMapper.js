const getMappedChat = chatFromDb => {
	const { members, id, title } = chatFromDb;
	return {
		members: members.map(x => x.toString()),
		title,
		id,
	};
};

module.exports = {
	getMappedChat,
};
