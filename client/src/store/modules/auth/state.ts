import { UserPayload } from "@/store/modules/auth/types";

const authInitialState = (): UserPayload => ({
    login: null,
    lastName: null,
    firstName: null,
    avatar: null
});

export default authInitialState;