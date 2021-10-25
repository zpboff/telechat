import { MutationTree } from "vuex";
import { AuthInfo } from "@/store/modules/auth/types";
import authInitialState from "@/store/modules/auth/state";
import { removeToken } from "@/store/modules/auth/tokenStorage";

const authMutations: MutationTree<AuthInfo> = {
    setAuthInfo(state, authInfo: AuthInfo) {
        state.accessToken = authInfo.accessToken;
        state.email = authInfo.email;
    },
    logout(state) {
        removeToken();
        const defaultState = authInitialState();
        state.accessToken = defaultState.accessToken;
        state.email = defaultState.email;
    }
};

export default authMutations;