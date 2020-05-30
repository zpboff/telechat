import { UserRoles } from "telechat-auth/types/roles";

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    registrationDate?: Date;
    isOnline?: boolean;
    initials?: string;
    roles?: UserRoles[];
}

export type User = IUser & {
    id: string;
};
