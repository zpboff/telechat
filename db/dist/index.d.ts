declare const initializeDbConnection: (connectionString: string) => Promise<void>;
declare const userRepository: {
    createUser: (model: import("./types/user").IUser) => Promise<import("./types/user").User>;
    getUserByEmail: (email: string) => Promise<import("./types/user").User>;
    getUserById: (id: string) => Promise<import("./types/user").User>;
    updateUserById: (id: string, changes: Partial<import("./types/user").IUser>) => Promise<import("./types/user").User>;
};
export { initializeDbConnection, userRepository };
