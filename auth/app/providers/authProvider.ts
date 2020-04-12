import { sign } from "jsonwebtoken";
import { SigninModel, SignupModel } from "../Types";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "./usersProvider";
import { User } from "telechat-db";
import { secret, accessTokenExpiresIn } from "../constants/appSettings";
import { getUserFromSignup } from "../mappers/userMapper";

export const signup = async (signupModel: SignupModel) => {
    const userRecord = await getUserByEmail(signupModel.email);

    if (userRecord) {
        throw new Error("Email занят");
    }

    const user = getUserFromSignup(signupModel);

    const userModel = await createUser(user);

    return await generateToken(userModel);
};

export const signin = async (user: SigninModel) => {
    const userRecord = await getUserByEmail(user.email);

    if (!userRecord) {
        throw new Error("Пользователь не найден");
    }

    const passwordsIsEquals = await bcrypt.compare(user.password, userRecord.password);

    if (passwordsIsEquals) {
        return await generateToken(userRecord);
    }

    throw new Error("Неверный пароль");
};

const generateToken = async (user: User) => {
    const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        initials: user.initials
    };

    const signature = secret;
    const expiresIn = accessTokenExpiresIn;
    const expiresDate = new Date(Date.now() + accessTokenExpiresIn);

    const accessToken = sign({ payload }, signature, { expiresIn });

    return {
        accessToken,
        expiresDate
    };
};