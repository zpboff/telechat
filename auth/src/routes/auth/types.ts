export type UserViewModel = {
    login: string;
    firstName: string;
    lastName: string;
}

export type AuthenticateResponse = {
    accessToken: string | null | undefined;
    user: UserViewModel;
}