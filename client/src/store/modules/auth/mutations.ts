import { MutationTree } from "vuex";
import { AuthInfo } from "@/store/modules/auth/types";
import authInitialState from "@/store/modules/auth/state";

const authMutations: MutationTree<AuthInfo> = {
    setAuthInfo(state, authInfo: AuthInfo) {
        state = authInfo;
    },
    logout(state) {
        state = authInitialState;
    }
};

export default authMutations;