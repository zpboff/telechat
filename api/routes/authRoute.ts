import express, { Request, Response } from 'express';
import withUser from '../middlewares/withUser';
import { validateSignin, validateSignup } from '../helpers/validation';
import { signin, signup } from '../providers/authProvider';

const router = express.Router();

async function sendResponse(req: Request, res: Response, obtainFunciton: (req: Request) => any) {
	try {
		var result = await obtainFunciton(req);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(500).json({ errors: { internal: e.message } });
	}
}

router.post('/signup', async (req, res) => {
	var { errors, isValid } = validateSignup({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	sendResponse(req, res, ({ body }) => signup(body));
});

router.post('/signin', async (req, res) => {
	var { errors, isValid } = validateSignin({ ...req.body });

	if (!isValid) {
		return res.status(500).json({ errors });
	}

	sendResponse(req, res, ({ body }) => signin(body));
});

module.exports = router;
