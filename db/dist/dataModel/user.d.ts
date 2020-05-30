import { Document } from "mongoose";
import { IUser } from "../types/user";
interface IUserSchema extends Document, IUser {
}
declare const UserModel: import("mongoose").Model<IUserSchema, {}>;
export { UserModel };
