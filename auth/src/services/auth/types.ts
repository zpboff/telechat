import { TokenInfo } from "../token/types";
import { UserViewModel } from "../user";

export type BaseErrors = {
    common?: string;
}

export type AuthActionResult = TokenInfo & {
    user: UserViewModel;
}