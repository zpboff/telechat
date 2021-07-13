import { User } from "../../stores";
import { UserViewModel } from "./types";

export const mapUser = (user: User): UserViewModel => ({ id: user.id, email: user.email})