const isAuth = require('../middlewares/isAuth');
const withUser = require('../middlewares/withUser');
const hasRole = require('../middlewares/hasRole');
const express = require('express');
const { validateSignin, validateSignup, isEmpty } = require('../helpers/validation');
const { signin, signup, signinAsUser } = require('../providers/authProvider');

const router = express.Router();

router.post('/auth/signup', async (req, res) => {
	var { errors, isValid } = validateSignup({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	try {
		var token = await signup(req.body);
		return res.status(200).json({ token });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

router.post('/auth/signin', async (req, res) => {
	var { errors, isValid } = validateSignin({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	try {
		var token = await signin(req.body);
		return res.status(200).json({ token });
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
});

router.post('/auth/signin-as-user', isAuth, withUser, hasRole('admin'), async (req, res) => {
	const email = req.body.email;
	try {
		var token = await signinAsUser(email);
		return res.status(200).json({ token });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

module.exports = router;
