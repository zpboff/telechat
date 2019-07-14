const mongoose = require("mongoose");
const AppSettings = require("../../constants/appSettings");

const UserSchema = new mongoose.Schema({
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
    }
    next();
});

module.exports = mongoose.model("users", UserSchema);
