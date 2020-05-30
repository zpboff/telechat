"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var consts_1 = require("telechat-auth/consts");
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    isOnline: { type: Boolean, default: false }
});
UserSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        var document_1 = this;
        document_1.initials = this.firstName[0] + this.lastName[0];
        var salt = bcryptjs_1.default.genSaltSync(consts_1.Salt);
        var passwordHashed = bcryptjs_1.default.hashSync(document_1.password, salt);
        document_1.password = passwordHashed;
    }
    next();
});
var UserModel = mongoose_1.model("users", UserSchema);
exports.UserModel = UserModel;
