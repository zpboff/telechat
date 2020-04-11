import { getUserById, createUser, getUserByEmail } from "../../../db/repositories/userRepository";
import { IUser } from "../../../db/Types";

export const getById = async (id: string) => {
    const user = await getUserById(id);

    return user;
};

export const getByEmail = async (email: string) => {
    const user = await getUserByEmail(email);

    return user;
};

export const create = async (model: IUser) => {
    var user = await createUser(model);

    return user;
};
