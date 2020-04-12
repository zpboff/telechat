import { Document } from "mongoose";
import { IUser } from "types/User";
interface IUserSchema extends Document, IUser {
}
declare const UserModel: import("mongoose").Model<IUserSchema, {}>;
export { UserModel };
