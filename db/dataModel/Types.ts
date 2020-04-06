import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    registrationDate: Date;
    initials: string;
    isOnline: boolean;
}