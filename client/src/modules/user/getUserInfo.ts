import { client } from "@/client";
import { Nullable } from "@/types";

export enum RelationsState {
    Initial,
    Subscribed,
    Friend,
    Blocked
}

export type UserPayload = {
    login: string;
    firstName: string;
    lastName: string;
}

export type UserDetailCard = UserPayload & {
    isSubscriber: boolean;
    avatar: string;
    birthdayDate: string;
    locationId: number;
    locationName: string;
    contactEmail: string;
    contactPhone: string;
    friendsCount: number;
    subscribersCount: number;
    friends: UserPayload[];
    relationState: Nullable<RelationsState>;
}

export async function getUserInfo(login: string): Promise<UserDetailCard> {
    const { data } = await client.get<UserDetailCard>(`/users/get/${login}`);

    return data;
}