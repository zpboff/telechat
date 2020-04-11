import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    id: Types.ObjectId,
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    registrationDate: Date;
    initials: string;
    isOnline: boolean;
}