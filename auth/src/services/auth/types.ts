import { TokenInfo } from "../token/types";
import {User} from "../user";

export type AuthActionResult = TokenInfo & {
    user: User;
}