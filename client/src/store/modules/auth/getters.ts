import { GetterTree } from "vuex";
import { AuthInfo } from "@/store/modules/auth/types";

const authGetters: GetterTree<AuthInfo, AuthInfo> = {
    isAuthenticated: state => state.isAuthenticated
};

export default authGetters;