import { Document } from "mongoose";
import { IUser } from "telechat-db";
interface IUserSchema extends Document, IUser {
}
declare const UserModel: import("mongoose").Model<IUserSchema, {}>;
export { UserModel };
