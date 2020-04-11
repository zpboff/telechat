import { User } from "../../../db/Types";
import { UserPayload, Nullable, SigninModel } from "../Types";

export const getUserPayload = (userFromDb: Nullable<User>): Nullable<UserPayload> => {
    if (!userFromDb) {
        return null;
    }

    const { firstName, id, lastName, isOnline, birthDate, initials } = userFromDb;

    return {
        id: id.toHexString(),
        firstName,
        lastName,
        birthDate,
        initials,
        isOnline
    };
};

export const getUserFromSignin = (signinModel: SigninModel): User => {
    return {
        birthDate: new Date(),
        email: '',
        firstName: '',
        id: '',
        initials: '',
        isOnline: true,
        lastName: '',
        password: '',
        registrationDate: new Date()
    }
}