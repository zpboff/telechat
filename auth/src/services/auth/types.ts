import { TokenInfo } from "../token/types";
import { UserViewModel } from "../user";

export type AuthInfo = TokenInfo & {
    user?: UserViewModel;
}