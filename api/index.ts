import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initializeDbConnection } from "../db/index";
import authRoute from "./routes/authRoute";
import { mainPort } from "./constants/appSettings";
import { dbRoute } from "./constants/conStrings";

initializeDbConnection(dbRoute);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", authRoute);

app.get("/", function (req, res) {
    res.sendStatus(200);
});

app.listen(mainPort, () => console.log(`LISTENING ON PORT ${mainPort}`));
