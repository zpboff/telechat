const isAuth = require('../middlewares/isAuth');
const withUser = require('../middlewares/withUser');
const hasRole = require('../middlewares/hasRole');
const express = require('express');
const { validateSignin, validateSignup } = require('../helpers/validation');
const { signin, signup, signinAsUser } = require('../providers/authProvider');

const router = express.Router();

router.post('/signup', async (req, res) => {
	var { errors, isValid } = validateSignup({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	try {
		var tokens = await signup(req.body);
		return res.status(200).json(tokens);
	} catch (e) {
		return res.status(500).json({ errors: { internal: e } });
	}
});

router.post('/signin', async (req, res) => {
	var { errors, isValid } = validateSignin({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	try {
		var tokens = await signin(req.body);
		return res.status(200).json(tokens);
	} catch (e) {
		return res.status(500).json({ errors: { internal: e } });
	}
});

router.post('/signin-as-user', isAuth, withUser, hasRole('admin'), async (req, res) => {
	const email = req.body.email;
	try {
		var tokens = await signinAsUser(email);
		return res.status(200).json(tokens);
	} catch (e) {
		return res.status(500).json({ errors: { internal: e } });
	}
});

module.exports = router;
