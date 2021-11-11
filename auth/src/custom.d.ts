import {UserViewModel} from "./routes/auth/types";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserViewModel
        }
    }
}