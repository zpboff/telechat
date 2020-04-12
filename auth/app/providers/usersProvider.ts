import { getUserById, createUser, getUserByEmail } from "../../../db/repositories/userRepository";
import { User } from "../../../db/Types";

export const getById = async (id: string) => {
    const user = await getUserById(id);

    return user as User;
};

export const getByEmail = async (email: string) => {
    const user = await getUserByEmail(email);

    return user as User;
};

export const create = async (model: User) => {
    var user = await createUser(model);

    return user;
};
