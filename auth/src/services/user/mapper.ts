import { User } from "../../stores";
import { UserViewModel } from "./types";

export const mapUser = (user: User): UserViewModel => ({ email: user.email})