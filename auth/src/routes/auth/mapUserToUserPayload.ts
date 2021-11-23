import {User} from "../../services";
import {UserPayload, UserDetailCard} from "./types";
import {isNil} from "lodash";
import {Nullable} from "../../types";
import {RelationState} from "../../stores/relationsStore";
import {getRelationInfo} from "../../services";

export function mapUserToUserPayload(user: Nullable<User>): Nullable<UserPayload> {
    if (isNil(user)) {
        return null;
    }

    return {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: ""
    }
}

export async function mapUserToUserDetailCard(login: string, user: Nullable<User>): Promise<Nullable<UserDetailCard>> {
    if (isNil(user)) {
        return null;
    }

    const userPayload = mapUserToUserPayload(user) as UserPayload;
    const relationState = await getRelationInfo(login, user.login);
    const isSubscriber = relationState.entity?.state === RelationState.Subscribed
        && relationState.entity?.stateinitiatorlogin === user.login

    return {
        ...userPayload,
        isSubscriber,
        relationState: relationState.entity?.state,
        birthdayDate: new Date(2000, 5, 4),
        friendsCount: 4,
        subscribersCount: 142,
        friends: [
            {
                login: "1",
                firstName: "София",
                lastName: "Замараева",
                avatar: ""
            },
            {
                login: "2",
                firstName: "Алексей",
                lastName: "Кашин",
                avatar: ""
            },
            {
                login: "3",
                firstName: "Максим",
                lastName: "Букин",
                avatar: ""
            },
            {
                login: "4",
                firstName: "Александр",
                lastName: "Букин",
                avatar: ""
            }
        ],
        contactEmail: "mail@mail.mail",
        contactPhone: "+79998887766",
        locationId: 0,
        locationName: "Тула, Россия"
    }
}