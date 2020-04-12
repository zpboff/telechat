import { User, IUser } from "telechat-db";
export declare const getUserById: (id: string) => Promise<User>;
export declare const getUserByEmail: (email: string) => Promise<User>;
export declare const updateUserById: (id: string, changes: IUser) => Promise<User>;
export declare const createUser: (model: IUser) => Promise<User>;
