import { MutationTree } from "vuex";
import { UserViewModel } from "@/store/modules/auth/types";
import authInitialState from "@/store/modules/auth/state";
import { removeToken } from "@/store/modules/auth/tokenStorage";

const authMutations: MutationTree<UserViewModel> = {
    setAuthInfo(state, authInfo: UserViewModel) {
        state.firstName = authInfo.firstName;
        state.lastName = authInfo.lastName;
        state.login = authInfo.login;
    },
    logout(state) {
        removeToken();
        const defaultState = authInitialState();
        state.login = defaultState.login;
        state.firstName = defaultState.firstName;
        state.lastName = defaultState.lastName;
    }
};

export default authMutations;