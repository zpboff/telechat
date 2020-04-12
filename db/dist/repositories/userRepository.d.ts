import { User } from "types/User";
export declare const getUserById: (id: string) => Promise<User>;
export declare const getUserByEmail: (email: string) => Promise<User>;
export declare const updateUserById: (id: string, changes: User) => Promise<User>;
export declare const createUser: (model: User) => Promise<User>;
