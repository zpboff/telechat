"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var isEmpty = function (value) {
    return (value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0));
};
exports.validateSignup = function (data) {
    var errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordConfirmation = !isEmpty(data.passwordConfirmation)
        ? data.passwordConfirmation
        : "";
    if (!validator_1.default.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = "Имя должно содержать не менее 2 символов";
    }
    if (validator_1.default.isEmpty(data.firstName)) {
        errors.firstName = "Необходимо ввести имя";
    }
    if (!validator_1.default.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = "Фамилия должна содержать не менее 2 символов";
    }
    if (validator_1.default.isEmpty(data.lastName)) {
        errors.lastName = "Необходимо ввести фамилию";
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Неверный email";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Необходимо ввести email";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Пароль должен содержать не менее 6 символов";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Необходимо ввести пароль";
    }
    if (!validator_1.default.isLength(data.passwordConfirmation, { min: 6, max: 30 })) {
        errors.passwordConfirmation =
            "Пароль должен содержать не менее 6 символов";
    }
    if (!validator_1.default.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "Пароли должны совпадать";
    }
    if (validator_1.default.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = "Необходимо подтвердить пароль";
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};
exports.validateSignin = function (data) {
    var errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Неверный email";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Необходимо ввести email";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Пароль должен содержать не менее 6 символов";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Необходимо ввести пароль";
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};
