import { ActionTree } from "vuex";
import { AuthInfo, Credentials } from "@/store/modules/auth/types";
import { AuthResult, login, logout, refresh, register } from "@/store/modules/auth/api";
import isEmpty from "lodash.isempty";
import { getToken, removeToken, saveToken } from "@/store/modules/auth/tokenStorage";

type AuthPayload = {
    authInfo: AuthResult;
    defaultErrorMessage: string
}

const authActions: ActionTree<AuthInfo, AuthInfo> = {
    Login: async function({ dispatch }, credentials: Credentials) {
        const authInfo = await login(credentials);
        return await dispatch("SetAuthInfo", { authInfo, defaultErrorMessage: "Ошибка при входе в систему" });
    },
    Register: async function({ dispatch }, credentials: Credentials): Promise<string[]> {
        const authInfo = await register(credentials);

        return await dispatch("SetAuthInfo", { authInfo, defaultErrorMessage: "Ошибка при регистрации в системе" });
    },
    async Refresh({ dispatch }) {
        const authInfo = await refresh();

        return await dispatch("SetAuthInfo", { authInfo });
    },
    async SetAuthInfo({ commit }, payload: AuthPayload) {
        const { authInfo, defaultErrorMessage } = payload;

        if (!authInfo || !isEmpty(authInfo.errors)) {
            await commit("logout");
            return authInfo?.errors ?? defaultErrorMessage;
        }

        const { user, accessToken } = authInfo;

        saveToken(accessToken);

        await commit("setAuthInfo", { email: user.email });
    },
    async Logout({ commit }) {
        await logout();
        commit("logout");
    }
};

export default authActions;