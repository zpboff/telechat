import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { authRouter } from "./routes/authRoute";
import { mainPort } from "./constants/appSettings";
import { dbRoute } from "./constants/conStrings";
import { initializeDbConnection } from "@telechat/db";

initializeDbConnection(dbRoute);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

app.get("/", function (_, res) {
    res.send("AuthAPI");
});

app.listen(mainPort, () => console.log(`LISTENING ON PORT ${mainPort}`));
