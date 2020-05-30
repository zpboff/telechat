import { userRepository } from "telechat-db";
import { User, IUser } from "telechat-db/types/user";

export const getUserById = async (id: string) => {
    const user = await userRepository.getUserById(id);

    return user as User;
};

export const getUserByEmail = async (email: string) => {
    const user = await userRepository.getUserByEmail(email);

    return user as User;
};

export const createUser = async (model: IUser) => {
    var user = await userRepository.createUser(model);

    return user;
};
