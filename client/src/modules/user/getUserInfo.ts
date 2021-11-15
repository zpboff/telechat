import { client } from "@/client";
import { Nullable } from "@/types";

export enum UsersRelationsState {
    Subscribed,
    Friend,
    Blocked,
    Canceled
}

export type UserPayload = {
    login: string;
    firstName: string;
    lastName: string;
}

export type UserViewModel = UserPayload & {
    isSubscriber: boolean;
    relationState: Nullable<UsersRelationsState>;
}

export async function getUserInfo(login: string): Promise<UserViewModel> {
    const { data } = await client.get<UserViewModel>(`/users/get/${login}`);

    return data;
}