import {User} from "../../services";
import {UserViewModel} from "./types";
import {isNil} from "lodash";

export function mapUserViewModel(user: User | null): UserViewModel | null {
    if (isNil(user)) {
        return null;
    }

    return {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName
    }
}