import { Nullable } from "@/types";

export type UserPayload = {
    login: Nullable<string>;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    avatar: Nullable<string>;
};

export type Credentials = {
    email: string;
    password: string;
};

export type UserCreateModel = Credentials & {
    firstName: string;
    lastName: string;
};