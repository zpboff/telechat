import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import { SigninModel } from "Types";
import bcrypt from "bcryptjs";
import { IUser } from "../../../db/Types";
import { getByEmail, create } from "./usersProvider";

const signup = async (user: SigninModel) => {
    const userRecord = await getByEmail(user.email);

    if (userRecord) {
        throw new Error("Email занят");
    }

    const userModel = await create(user);

    return await generateToken(userModel);
};

const signin = async (user: SigninModel) => {
    const userRecord = await getOriginUser({ email: user.email });

    if (!userRecord) {
        throw new Error("Пользователь не найден");
    }

    const passwordsIsEquals = await bcrypt.compare(user.password, userRecord.password);

    if (passwordsIsEquals) {
        return await generateToken(userRecord);
    }

    throw new Error("Неверный пароль");
};

const generateToken = async (user: IUser, refreshToken = v4()) => {
    const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        initials: user.initials,
        birthDate: user.birthDate
    };

    const signature = Secret;
    const expiresIn = AccessTokenExpiresIn;
    const expiresDate = new Date(Date.now() + expiresIn);

    const accessToken = sign({ payload }, signature, { expiresIn });

    await upsertSession({
        userId: user.id,
        refreshToken,
        expiresDate
    });

    return {
        accessToken,
        refreshToken,
        expiresDate
    };
};

export default {
    signin,
    signup,
    refreshToken
};
