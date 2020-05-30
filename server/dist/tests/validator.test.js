"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_1 = require("helpers/validation");
describe("Signup", function () {
    it("Empty fields", function () {
        var signupModel = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordConfirmation: ""
        };
        var errors = validation_1.validateSignup(signupModel);
        expect(errors).toStrictEqual({
            errors: {
                email: "Необходимо ввести email",
                firstName: "Необходимо ввести имя",
                lastName: "Необходимо ввести фамилию",
                password: "Необходимо ввести пароль",
                passwordConfirmation: "Необходимо подтвердить пароль"
            },
            isValid: false
        });
    });
    it("Invalid fields", function () {
        var signupModel = {
            email: "123",
            firstName: "1",
            lastName: "2",
            password: "12345",
            passwordConfirmation: "123"
        };
        var errors = validation_1.validateSignup(signupModel);
        expect(errors).toStrictEqual({
            errors: {
                email: "Неверный email",
                firstName: "Имя должно содержать не менее 2 символов",
                lastName: "Фамилия должна содержать не менее 2 символов",
                password: "Пароль должен содержать не менее 6 символов",
                passwordConfirmation: "Пароли должны совпадать"
            },
            isValid: false
        });
    });
    it("Valid model", function () {
        var signupModel = {
            email: "123@email.com",
            firstName: "first",
            lastName: "last",
            password: "123457",
            passwordConfirmation: "123457"
        };
        var errors = validation_1.validateSignup(signupModel);
        expect(errors).toStrictEqual({
            errors: {},
            isValid: true
        });
    });
});
