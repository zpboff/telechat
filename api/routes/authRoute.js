const isAuth = require('../middlewares/isAuth');
const withUser = require('../middlewares/withUser');
const hasRole = require('../middlewares/hasRole');
const UserModel = require('../db/dataModel/user');
const { generateToken } = require('../providers/authProvider');
const express = require('express');

const router = express.Router();

router.post('/auth/signin-as-user', isAuth, withUser, hasRole('admin'), async (req, res) => {
	const email = req.body.email;
	const userRecord = await UserModel.findOne({ email });

	if (!userRecord) {
		return res.status(404).send('Пользователь не найден');
	}

	return res
		.json({
			user: {
				email: userRecord.email,
				name: userRecord.name,
			},
			jwt: generateToken(userRecord),
		})
		.status(200);
});

module.exports = router;