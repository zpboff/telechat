import {User} from "../../services";
import {UserPayload, UserViewModel} from "./types";
import {isNil} from "lodash";
import {Nullable} from "../../types";
import {UsersRelationsState} from "../../stores/usersRelations";
import {getRelationInfo} from "../../services/relations/getRelationInfo";

export function mapUserToUserPayload(user: Nullable<User>): Nullable<UserPayload> {
    if (isNil(user)) {
        return null;
    }

    return {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName
    }
}

export async function mapUserToUserViewModel(login: string, user: Nullable<User>): Promise<Nullable<UserViewModel>> {
    if (isNil(user)) {
        return null;
    }

    const userPayload = mapUserToUserPayload(user) as UserPayload;
    const relationState = await getRelationInfo(login, user.login);
    const isSubscriber = relationState.entity?.state === UsersRelationsState.Subscribed
        && relationState.entity?.userlogin === user.login

    return {
        ...userPayload,
        isSubscriber,
        relationState: relationState.entity?.state
    }
}