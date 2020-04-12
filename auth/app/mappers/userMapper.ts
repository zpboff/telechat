import { IUser, User } from "telechat-db";
import { UserPayload, Nullable, SignupModel } from "../Types";

export const getUserPayload = (userFromDb: Nullable<User>): Nullable<UserPayload> => {
    if (!userFromDb) {
        return null;
    }

    const { firstName, id, lastName, isOnline, initials } = userFromDb;

    return {
        id,
        firstName,
        lastName,
        initials: initials ?? "",
        isOnline: isOnline ?? false
    };
};

export const getUserFromSignup = (signinModel: SignupModel): IUser => {
    const { email, password, firstName, lastName } = signinModel;

    return {
        email,
        firstName,
        lastName,
        password
    };
};