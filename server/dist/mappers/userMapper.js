"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPayload = function (userFromDb) {
    if (!userFromDb) {
        return null;
    }
    var firstName = userFromDb.firstName, id = userFromDb.id, lastName = userFromDb.lastName, isOnline = userFromDb.isOnline, initials = userFromDb.initials;
    return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        initials: initials !== null && initials !== void 0 ? initials : "",
        isOnline: isOnline !== null && isOnline !== void 0 ? isOnline : false
    };
};
exports.getUserFromSignup = function (signinModel) {
    var email = signinModel.email, password = signinModel.password, firstName = signinModel.firstName, lastName = signinModel.lastName;
    return {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    };
};
