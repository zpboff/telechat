import { MutationTree } from "vuex";
import { UserPayload } from "@/store/modules/auth/types";
import authInitialState from "@/store/modules/auth/state";
import { removeToken } from "@/store/modules/auth/tokenStorage";

const authMutations: MutationTree<UserPayload> = {
    setAuthInfo(state, authInfo: UserPayload) {
        state.firstName = authInfo.firstName;
        state.lastName = authInfo.lastName;
        state.login = authInfo.login;
        state.avatar = authInfo.avatar;
    },
    logout(state) {
        removeToken();
        const defaultState = authInitialState();
        state.login = defaultState.login;
        state.firstName = defaultState.firstName;
        state.lastName = defaultState.lastName;
        state.lastName = defaultState.avatar;
    }
};

export default authMutations;