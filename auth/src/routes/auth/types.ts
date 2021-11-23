import {RelationState} from "../../stores/relationsStore";
import {Nullable} from "../../types";

export type UserPayload = {
    login: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export type UserDetailCard = UserPayload & {
    isSubscriber: boolean;
    avatar: string;
    birthdayDate: Date;
    locationId: number;
    locationName: string;
    contactEmail: string;
    contactPhone: string;
    friendsCount: number;
    subscribersCount: number;
    friends: UserPayload[];
    relationState: Nullable<RelationState>;
}

export type AuthenticateResponse = {
    accessToken: string | null | undefined;
    user: UserPayload | null;
}