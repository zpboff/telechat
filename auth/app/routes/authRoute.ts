import express, { Request, Response } from "express";
import { validateSignin, validateSignup } from "../helpers/validation";
import { signin, signup } from "../providers/authProvider";

const authRouter = express.Router();

async function generateResponse(
    req: Request,
    res: Response,
    obtainFunciton: (req: Request) => any
) {
    try {
        var result = await obtainFunciton(req);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({ errors: { internal: e.message } });
    }
}

authRouter.post("/signup", async (req: Request, res: Response) => {
    var { errors, isValid } = validateSignup({ ...req.body });

    if (!isValid) {
        return res.status(500).json({ errors });
    }

    return generateResponse(req, res, ({ body }) => signup(body));
});

authRouter.post("/signin", async (req: Request, res: Response) => {
    var { errors, isValid } = validateSignin({ ...req.body });

    if (!isValid) {
        return res.status(500).json({ errors });
    }

    return generateResponse(req, res, ({ body }) => signin(body));
});

export { authRouter };
