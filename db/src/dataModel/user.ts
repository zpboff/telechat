import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";
import { Salt } from "../consts";
import { IUser } from "types/User";

interface IUserSchema extends Document, IUser {}

const UserSchema: Schema<IUserSchema> = new Schema<IUserSchema>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    isOnline: { type: Boolean, default: false }
});

UserSchema.pre<IUserSchema>("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        const document = this;
        document.initials = this.firstName[0] + this.lastName[0];
        var salt = bcrypt.genSaltSync(Salt);
        const passwordHashed = bcrypt.hashSync(document.password, salt);
        document.password = passwordHashed;
    }

    next();
});

const UserModel = model<IUserSchema>("users", UserSchema);

export { UserModel };
