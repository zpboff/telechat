declare const initializeDbConnection: (connectionString: string) => Promise<void>;
declare const userRepository: {
    createUser: (model: import("telechat-db").IUser) => Promise<import("telechat-db").User>;
    getUserByEmail: (email: string) => Promise<import("telechat-db").User>;
    getUserById: (id: string) => Promise<import("telechat-db").User>;
    updateUserById: (id: string, changes: import("telechat-db").IUser) => Promise<import("telechat-db").User>;
};
export { initializeDbConnection, userRepository };
