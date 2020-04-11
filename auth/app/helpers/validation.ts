import Validator from "validator";
import {
    SignupModel,
    SignupErrorModel,
    SigninModel,
    SigninErrorModel,
    ValidationResult
} from "../Types";

const isEmpty = (value: any) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};

export const validateSignup = (data: SignupModel): ValidationResult<SignupErrorModel> => {
    var errors: SignupErrorModel = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordConfirmation = !isEmpty(data.passwordConfirmation)
        ? data.passwordConfirmation
        : "";

    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = "Имя должно содержать не менее 2 символов";
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "Необходимо ввести имя";
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = "Фамилия должна содержать не менее 2 символов";
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Необходимо ввести фамилию";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Неверный email";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Необходимо ввести email";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Пароль должен содержать не менее 6 символов";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Необходимо ввести пароль";
    }

    if (!Validator.isLength(data.passwordConfirmation, { min: 6, max: 30 })) {
        errors.passwordConfirmation =
            "Пароль должен содержать не менее 6 символов";
    }

    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "Пароли должны совпадать";
    }

    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = "Необходимо подтвердить пароль";
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};

export const validateSignin = (data: SigninModel): ValidationResult<SigninErrorModel> => {
    let errors: SigninErrorModel = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "Неверный email";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Необходимо ввести email";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Пароль должен содержать не менее 6 символов";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Необходимо ввести пароль";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
