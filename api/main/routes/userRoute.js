const isAuth = require('../middlewares/isAuth');
const withUser = require('../middlewares/withUser');
const router = require('express').Router();
const usersProvider = require('../providers/usersProvider');

router.get('/getall', isAuth, withUser, async (req, res) => {
	try {
		var users = await usersProvider.getAll(req.currentUser.id);
		return res.status(200).json({ users });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.get('/getuserinfo/:id', isAuth, async (req, res) => {
	try {
		var { id } = req.params
		var user = await usersProvider.getUserById(id);
		return res.status(200).json({ user });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
})

module.exports = router;