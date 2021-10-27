import { AuthInfo } from "@/store/modules/auth/types";

const authInitialState = (): AuthInfo => ({
    email: null
});

export default authInitialState;