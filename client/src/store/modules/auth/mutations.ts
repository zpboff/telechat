import { MutationTree } from "vuex";
import { AuthInfo } from "@/store/modules/auth/types";
import authInitialState from "@/store/modules/auth/state";

const authMutations: MutationTree<AuthInfo> = {
    setAuthInfo(state, authInfo: AuthInfo) {
        state.isAuthenticated = authInfo.isAuthenticated;
    },
    logout(state) {
        const defaultState = authInitialState();
        state.isAuthenticated = defaultState.isAuthenticated;
    }
};

export default authMutations;