import {UsersRelationsState} from "../../stores/usersRelations";
import {Nullable} from "../../types";

export type UserPayload = {
    login: string;
    firstName: string;
    lastName: string;
}

export type UserViewModel = UserPayload & {
    isSubscriber: boolean;
    relationState: Nullable<UsersRelationsState>;
}

export type AuthenticateResponse = {
    accessToken: string | null | undefined;
    user: UserPayload | null;
}