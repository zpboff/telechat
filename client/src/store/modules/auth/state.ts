import { UserViewModel } from "@/store/modules/auth/types";

const authInitialState = (): UserViewModel => ({
    login: null,
    lastName: null,
    firstName: null
});

export default authInitialState;