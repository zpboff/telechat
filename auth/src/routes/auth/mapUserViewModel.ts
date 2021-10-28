import {User} from "../../services";
import {UserViewModel} from "./types";

export function mapUserViewModel(user: User): UserViewModel {
    return {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName
    }
}