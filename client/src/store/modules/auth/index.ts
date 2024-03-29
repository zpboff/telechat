import { Module } from "vuex";
import { UserViewModel } from "@/store/modules/auth/types";
import authInitialState from "@/store/modules/auth/state";
import authMutations from "@/store/modules/auth/mutations";
import authActions from "@/store/modules/auth/actions";
import authGetters from "@/store/modules/auth/getters";

const authStore: Module<UserViewModel, any> = {
    namespaced: true,
    state: authInitialState,
    mutations: authMutations,
    actions: authActions,
    getters: authGetters
};

export default authStore;