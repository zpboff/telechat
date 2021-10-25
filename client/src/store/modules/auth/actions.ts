import { ActionTree } from "vuex";
import { AuthInfo, Credentials } from "@/store/modules/auth/types";
import { login, register } from "@/store/modules/auth/api";
import isEmpty from "lodash.isempty";
import { saveToken } from "@/store/modules/auth/tokenStorage";

const authActions: ActionTree<AuthInfo, AuthInfo> = {
    Login: async function({ commit }, credentials: Credentials) {
        // await login(credentials);

        // await commit("setAuthInfo", { isAuthenticated: true });
    },
    Register: async function({ commit }, credentials: Credentials): Promise<string[]> {
        const result = await register(credentials);

        if (!result || !isEmpty(result.errors)) {
            await commit("setAuthInfo", { accessToken: null });
            return result?.errors ?? ['Ошибка регистрации'];
        }

        const { user, accessToken } = result;

        saveToken(accessToken);
        await commit("setAuthInfo", { accessToken, email: user.email });

        return [];
    },
    Logout({ commit }) {
        commit("logout");
    }
};

export default authActions;