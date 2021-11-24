import { GetterTree } from "vuex";
import { UserPayload } from "@/store/modules/auth/types";
import isEmpty from "lodash.isempty";

const authGetters: GetterTree<UserPayload, UserPayload> = {
    isAuthenticated: state => !isEmpty(state.login)
};

export default authGetters;