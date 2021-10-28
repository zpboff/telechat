import { TokenInfo } from "../token/types";
import {User} from "../user";

export type BaseErrors = {
    common?: string;
}

export type AuthActionResult = TokenInfo & {
    user: User;
}