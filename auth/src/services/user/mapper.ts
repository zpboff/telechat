import {UserEntity} from "../../stores";
import {isNil} from "lodash";
import {User} from "./types";

export const mapUserEntityToUser = (user: UserEntity | null | undefined): User | null => {
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