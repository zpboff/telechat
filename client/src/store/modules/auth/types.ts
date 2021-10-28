export type AuthInfo = {
    email: string | null;
}

export type Credentials = {
    email: string;
    password: string;
};

export type UserCreateModel = Credentials & {
    email: string;
    password: string;
};