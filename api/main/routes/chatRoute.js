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

router.post('/createprivatechat', isAuth, withUser, async (req, res) => {
	var { errors, isValid } = validateChat({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	try {
		req.body.members.push(req.currentUser.id);
		const chatId = await chatProvider.createChat(req.body);
		return res.status(200).json({ chatId });
	} catch (error) {
		return res.status(500).json({ error });
	}
});

module.exports = router;
