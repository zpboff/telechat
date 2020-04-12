import { UserModel } from "dataModel/user";
import { User } from "types/User";

export const getUserById = async (id: string) => {
    var user = await UserModel.findById(id);

    return user as User;
};

export const getUserByEmail = async (email: string) => {
    var user = await UserModel.findOne({ email });

    return user as User;
};

export const updateUserById = async (id: string, changes: User) => {
    var user = await UserModel.findByIdAndUpdate(id, { $set: changes });

    return user as User;
};

export const createUser = async (model: User) => {
    const userModel = new UserModel({ ...model });
    const user = await userModel.save();

    return user as User;
};
