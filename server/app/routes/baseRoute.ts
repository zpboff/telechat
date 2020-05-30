import { Request, Response } from "express";

export async function generateResponse(req: Request, res: Response, action: (req: Request) => any) {
    try {
        const result = await action(req);

        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({ errors: { internal: e.message } });
    }
}
