import {UserPayload} from "./routes/auth/types";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserPayload
        }
    }
}