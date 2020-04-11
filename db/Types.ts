import { Document } from "mongoose";

export interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    registrationDate: Date;
    isOnline: boolean;
    initials: string;
}
