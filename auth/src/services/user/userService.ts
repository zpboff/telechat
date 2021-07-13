import { getUser, User } from "../../stores";
import { isSuccess } from "../../types";
import { mapUser } from "./mapper";


export async function findUser(email: string) {
    const result = await getUser(email);

    if(isSuccess(result)) {
        return mapUser(result.entity as User);
    }

    return null;
}