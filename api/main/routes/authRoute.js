const isAuth = require('../middlewares/isAuth');
const withUser = require('../middlewares/withUser');
const hasRole = require('../middlewares/hasRole');
const express = require('express');
const { validateSignin, validateSignup } = require('../helpers/validation');
const { signin, signup, refreshToken } = require('../providers/authProvider');

const router = express.Router();

async function sendResponse(req, res, obtainFunciton) {
	try {
		var result = await obtainFunciton(req.body);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(500).json({ errors: { internal: e } });
	}
}

router.post('/signup', async (req, res) => {
	var { errors, isValid } = validateSignup({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	sendResponse(req, res, signup);
});

router.post('/signin', async (req, res) => {
	var { errors, isValid } = validateSignin({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	sendResponse(req, res, refreshToken);
});

router.post('/refresh-token', withUser,  async (req, res) => {
	sendResponse(req, res, refreshToken);
});

module.exports = router;
