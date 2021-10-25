import { AuthInfo } from "@/store/modules/auth/types";
import { getToken } from "@/store/modules/auth/tokenStorage";

const authInitialState = (): AuthInfo => ({
    accessToken: getToken(),
    email: null
});

export default authInitialState;