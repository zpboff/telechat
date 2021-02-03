import { sign, verify } from 'jsonwebtoken'
import { configs } from '../config'

function signJwt() {
    const payload = {

    }

    return sign(payload, configs.secret, { expiresIn: "5m" });
}

function verifyJwt(token: string) {
    try {
        return verify(token, configs.secret);
    }
    catch {
        return false;
    }
}