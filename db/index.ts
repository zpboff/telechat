import { connect, connection } from "mongoose";
import {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById
} from "./repositories/userRepository";

const initializeDbConnection = async (connectionString: string) => {
    await connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    connection
        .once("open", () => console.log("connected to the database"))
        .on("error", () => console.error("MongoDB connection error"));
};

const userRepository = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById
};

export { initializeDbConnection, userRepository };
