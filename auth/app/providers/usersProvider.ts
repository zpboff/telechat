import { userRepository } from "../../../db/src";
import { User, IUser } from "telechat-db";

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
