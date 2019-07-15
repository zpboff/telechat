const mongoose = require("mongoose");
import * as argon2 from 'argon2';

const UserSchema = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    registrationDate: { type: Date, default: Date.now },
    initials: { type: String },
    avatar: { type: String }
});

UserSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        const document = this;
        document.initials = document.firstName[0] + document.lastName[0];        
        const passwordHashed = await argon2.hash(user.password);
        document.password = passwordHashed;
    }
    next();
});

module.exports = mongoose.model("users", UserSchema);
