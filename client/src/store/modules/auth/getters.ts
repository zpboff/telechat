import { GetterTree } from "vuex";
import { AuthInfo } from "@/store/modules/auth/types";
import isEmpty from "lodash.isempty";

const authGetters: GetterTree<AuthInfo, AuthInfo> = {
    isAuthenticated: state => !isEmpty(state.email)
};

export default authGetters;