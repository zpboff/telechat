export type UserViewModel = {
    login: string | null;
    firstName: string | null;
    lastName: string | null;
};

export type Credentials = {
    email: string;
    password: string;
};

export type UserCreateModel = Credentials & {
    firstName: string;
    lastName: string;
};