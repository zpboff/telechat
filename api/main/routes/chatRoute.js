const isAuth = require('../middlewares/isAuth');
const withUser = require('../middlewares/withUser');
const router = require('express').Router();
const chatProvider = require('../providers/chatProvider');
const { validateChat } = require('../helpers/validation');

router.get('/getlastmessages', isAuth, withUser, async (req, res) => {
	try {
		var messages = chatProvider.getLastMessages(req.params.chatId);
		return res.status(200).json({ messages, error: null });
	} catch (error) {
		return res.status(500).json({ messages: null, error });
	}
});

router.get('/getchatlist', isAuth, withUser, async (req, res) => {
	var userId = req.currentUser.id;
	try {
		const chatList = await chatProvider.getChatList(userId);
		return res.status(200).json({ chatList });
	} catch (error) {
		return res.status(500).json({ chatList: [] });
	}
});

router.post('/createprivatechat', isAuth, withUser, async (req, res) => {
	var { errors, isValid } = validateChat({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	try {
		req.body.members.push(req.currentUser.id);
		const chatId = await chatProvider.getOrCreateChat(req.body);
		return res.status(200).json({ chatId });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

module.exports = router;
