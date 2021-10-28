import { ActionTree } from "vuex";
import { UserViewModel, Credentials, UserCreateModel } from "@/store/modules/auth/types";
import { AuthResult, login, logout, refresh, register } from "@/store/modules/auth/api";
import isEmpty from "lodash.isempty";
import { saveToken } from "@/store/modules/auth/tokenStorage";


const authActions: ActionTree<UserViewModel, UserViewModel> = {
    Login: async function({ dispatch }, credentials: Credentials) {
        const authInfo = await login(credentials);
        return await dispatch("SetAuthInfo", authInfo);
    },
    Register: async function({ dispatch }, user: UserCreateModel): Promise<string[]> {
        const authInfo = await register(user);

        return await dispatch("SetAuthInfo", authInfo);
    },
    async Refresh({ dispatch }) {
        const authInfo = await refresh();

        return await dispatch("SetAuthInfo", authInfo);
    },
    async SetAuthInfo({ commit }, authInfo: AuthResult<unknown>) {
        if (!authInfo || !isEmpty(authInfo.errors)) {
            await commit("logout");
            return authInfo?.errors;
        }

        const { user, accessToken } = authInfo;

        saveToken(accessToken);

        await commit("setAuthInfo", user);
    },
    async Logout({ commit }) {
        await logout();
        commit("logout");
    }
};

export default authActions;