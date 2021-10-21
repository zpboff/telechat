import { createStore } from "vuex";
import { AuthInfo } from "@/store/modules/auth/types";
import authInitialState from "@/store/modules/auth/state";
import authMutations from "@/store/modules/auth/mutations";
import authActions from "@/store/modules/auth/actions";
import authGetters from "@/store/modules/auth/getters";

export default createStore<AuthInfo>({
    state: authInitialState,
    mutations: authMutations,
    actions: {
        logout() {
            console.log(123)
        }
    },
    getters: authGetters
});
