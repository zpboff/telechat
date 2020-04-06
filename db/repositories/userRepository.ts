import { UserModel } from "../dataModel/user";
import { IUser } from "../dataModel/Types";

export const getUserById = async (id: string) => {
    var result = await UserModel.findById(id);

    return result;
};

export const getByEmail = async (email: string) => {
    var result = await UserModel.find({ email });

    return result;
};

export const updateUserById = async (id: string, changes: IUser) => {
    var result = await UserModel.findByIdAndUpdate(id, { $set: changes });

    return result;
};

export const createUser = async (model: IUser) => {
    const userModel = new UserModel({ ...model });
    var result = await userModel.save();

    return result;
};
