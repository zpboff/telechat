import { Schema, model, Types } from "mongoose";
import { IUser } from "./Types";
import bcrypt from "bcryptjs";
import { Salt } from "../consts";

const UserSchema: Schema<IUser> = new Schema({
    id: { type: Types.ObjectId },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
    registrationDate: { type: Date, default: Date.now },
    initials: { type: String },
    avatar: { type: String },
    chats: { type: Array },
    isOnline: { type: Boolean, default: false },
    friends: { type: Array, default: [] }
});

UserSchema.pre<IUser>("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const document = this;
        document.initials = document.firstName[0] + document.lastName[0];

        var salt = bcrypt.genSaltSync(Salt);
        const passwordHashed = await bcrypt.hash(document.password, salt);
        document.password = passwordHashed;
    }

    next();
});

const UserModel = model<IUser>("users", UserSchema);

export { UserModel };
