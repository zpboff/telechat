import {UserEntity} from "../../stores";
import {User} from "./service";
import {isNil} from "lodash";

export const mapUser = (user: UserEntity | null): User | null => {
    if (isNil(user)) {
        return null;
    }

    return {
        id: user.id,
        email: user.email,
        lastName: user.lastname,
        firstName: user.firstname,
        createDate: user.createdate,
        login: user.login,
        updateDate: user.updatedate
    }
}