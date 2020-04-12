export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    registrationDate?: Date;
    isOnline?: boolean;
    initials?: string;
}
export declare type User = IUser & {
    id: string;
};
