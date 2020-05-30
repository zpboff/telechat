"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var authRoute_1 = require("./routes/authRoute");
var appSettings_1 = require("./constants/appSettings");
var conStrings_1 = require("./constants/conStrings");
var telechat_db_1 = require("telechat-db");
telechat_db_1.initializeDbConnection(conStrings_1.dbRoute);
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api/auth", authRoute_1.authRouter);
app.get("/", function (_, res) {
    res.send("AuthAPI");
});
app.listen(appSettings_1.mainPort, function () { return console.log("LISTENING ON PORT " + appSettings_1.mainPort); });
