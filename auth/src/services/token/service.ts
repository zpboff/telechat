import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import { configs } from "../../configs";
import { UserViewModel } from "../user";

export function generateTokens(payload: UserViewModel) {    
    const accessToken = sign(payload, configs.secret, {
        expiresIn: configs.expiresIn
    });

    const refreshToken = v4();

    return {
        accessToken,
        refreshToken
    }
}