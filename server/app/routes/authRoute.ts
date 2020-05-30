import express, { Request, Response } from "express";
import { validateSignin, validateSignup } from "../helpers/validation";
import { signin, signup } from "../providers/authProvider";
import { generateResponse } from "./baseRoute";

const authRouter = express.Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
    var { errors, isValid } = validateSignup({ ...req.body });

    if (!isValid) {
        return res.status(400).json({ errors });
    }

    return generateResponse(req, res, ({ body }) => signup(body));
});

authRouter.post("/signin", async (req: Request, res: Response) => {
    var { errors, isValid } = validateSignin({ ...req.body });

    if (!isValid) {
        return res.status(400).json({ errors });
    }

    return generateResponse(req, res, ({ body }) => signin(body));
});

export { authRouter };
