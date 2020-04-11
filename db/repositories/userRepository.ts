import { UserModel } from "../dataModel/user";
import { User } from "../Types";

export const getUserById = async (id: string) => {
    var user = await UserModel.findById(id);

    return user;
};

export const getUserByEmail = async (email: string) => {
    var user = await UserModel.findOne({ email });

    return user;
};

export const updateUserById = async (id: string, changes: User) => {
    var user = await UserModel.findByIdAndUpdate(id, { $set: changes });

    return user;
};

export const createUser = async (model: User) => {
    const userModel = new UserModel({ ...model });
    const user = await userModel.save();

    return user;
};
