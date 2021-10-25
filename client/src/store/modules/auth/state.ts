import { AuthInfo } from "@/store/modules/auth/types";

const authInitialState = (): AuthInfo => ({
    accessToken: null,
    email: null
});

export default authInitialState;