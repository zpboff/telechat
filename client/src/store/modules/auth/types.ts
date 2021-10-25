export type AuthInfo = {
    accessToken: string | null;
    email?: string | null;
}

export type Credentials = {
    email: string;
    password: string;
};