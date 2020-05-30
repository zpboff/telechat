"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appSettings_1 = require("constants/appSettings");
var express_jwt_1 = __importDefault(require("express-jwt"));
var getTokenFromHeader = function (req) {
    if (req.headers.authorization) {
        var _a = req.headers.authorization.split(" "), typeFromHeader = _a[0], token = _a[1];
        if (typeFromHeader === appSettings_1.tokenType) {
            return token;
        }
    }
    return "";
};
var isAuth = express_jwt_1.default({
    secret: appSettings_1.secret,
    userProperty: "token",
    getToken: getTokenFromHeader
});
exports.isAuth = isAuth;
