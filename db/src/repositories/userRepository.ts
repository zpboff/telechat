import { UserModel } from "../dataModel/user";
import { User, IUser } from "telechat-db";

export const getUserById = async (id: string) => {
    var user = await UserModel.findById(id);

    return user as User;
};

export const getUserByEmail = async (email: string) => {
    var user = await UserModel.findOne({ email });

    return user as User;
};

export const updateUserById = async (id: string, changes: IUser) => {
    var user = await UserModel.findByIdAndUpdate(id, { $set: changes });

    return user as User;
};

export const createUser = async (model: IUser) => {
    const userModel = new UserModel({ ...model });
    const user = await userModel.save();

    return user as User;
};
