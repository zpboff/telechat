import { ActionTree } from "vuex";
import { AuthInfo, Credentials } from "@/store/modules/auth/types";
import { sendSignInRequest, sendSignUpRequest } from "@/store/modules/auth/api";

const authActions: ActionTree<AuthInfo, AuthInfo> = {
    async signIn({ commit }, credentials: Credentials) {
        await sendSignInRequest(credentials);

        await commit("setAuthInfo", true);
    },
    async signUp({ commit }, credentials: Credentials) {
        await sendSignUpRequest(credentials);

        await commit("setAuthInfo", true);
    },
    async logout({ commit }) {
        await commit("logout");
    }
};

export default authActions;