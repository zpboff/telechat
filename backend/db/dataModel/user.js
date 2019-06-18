const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AppSettings = require("../../constants/appSettings");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    registeredAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    initials: { type: String },
    avatar: { type: String }
});

UserSchema.pre("save", function(next) {
    if (this.isNew || this.isModified("password")) {
        const document = this;
        document.initials = document.firstName[0] + document.lastName[0];
        const salt = bcrypt.genSaltSync(AppSettings.SaltRounds);
        bcrypt.hash(document.password, salt, function(err, hashedPassword) {
            if (err) {
                next(err);
                return;
            }
            document.password = hashedPassword;
            next();
        });
        return;
    }
    next();
});

UserSchema.methods.isCorrectPassword = function(
    password,
    successAction,
    errorAction
) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

module.exports = mongoose.model("users", UserSchema);
