import { connect, connection } from "mongoose";

const initializeDbConnection = async (connectionString: string) => {
    await connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    connection
        .once("open", () => console.log("connected to the database"))
        .on("error", console.error.bind(console, "MongoDB connection error:"));
};

export { initializeDbConnection };
