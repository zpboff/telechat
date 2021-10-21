import { ActionTree } from "vuex";
import { AuthInfo, Credentials } from "@/store/modules/auth/types";
import { login, register } from "@/store/modules/auth/api";

const authActions: ActionTree<AuthInfo, AuthInfo> = {
    Login: async function({ commit }, credentials: Credentials) {
        await login(credentials);

        await commit("setAuthInfo", { isAuthenticated: true });
    },
    Register: async function({ commit }, credentials: Credentials) {
        await register(credentials);

        await commit("setAuthInfo", true);
    },
    Logout({ commit }) {
        commit("logout");
    },
    logout() {
        console.log(123)
    }
};

export default authActions;