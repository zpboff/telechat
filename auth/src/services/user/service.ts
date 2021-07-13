import { isNil } from "lodash";
import { getUser as get, createUser as create, User } from "../../stores";
import { isSuccess } from "../../types";
import { mapUser } from "./mapper";
import { UserViewModel } from "./types";


export async function findUser(email: string): Promise<UserViewModel | null> {
    const result = await get(email);

    if(isSuccess(result)) {
        return mapUser(result.entity as User);
    }

    return null;
}

export async function createUser(email: string, password: string): Promise<UserViewModel | null> {
    const result = await get(email);

    if(!isSuccess(result) || !isNil(result.entity)) {
        return null;
    }

    const s = await create(email, password);

    return null;
}