import { SignupModel, SignupErrorModel, ValidationResult } from "types";
import { validateSignup } from "../helpers/validation";

describe("Signup", () => {
    it("Empty fields", () => {
        const signupModel: SignupModel = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordConfirmation: ""
        };

        var errors = validateSignup(signupModel);

        expect(errors).toStrictEqual<ValidationResult<SignupErrorModel>>({
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

    it("Invalid fields", () => {
        const signupModel: SignupModel = {
            email: "123",
            firstName: "1",
            lastName: "2",
            password: "12345",
            passwordConfirmation: "123"
        };

        var errors = validateSignup(signupModel);

        expect(errors).toStrictEqual<ValidationResult<SignupErrorModel>>({
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

    it("Valid model", () => {
        const signupModel: SignupModel = {
            email: "123@email.com",
            firstName: "first",
            lastName: "last",
            password: "123457",
            passwordConfirmation: "123457"
        };

        var errors = validateSignup(signupModel);

        expect(errors).toStrictEqual<ValidationResult<SignupErrorModel>>({
            errors: {},
            isValid: true
        });
    });
});
