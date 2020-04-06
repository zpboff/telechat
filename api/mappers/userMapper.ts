import { IUser } from "../../db/dataModel/Types";
import { User } from "../Types";

export const getMappedUser = (userFromDb: IUser): User => {
    const { firstName, id, lastName, isOnline, birthDate, initials } = userFromDb;

    return {
        firstName,
        lastName,
        id,
        birthDate,
        initials,
        isOnline
    };
};
