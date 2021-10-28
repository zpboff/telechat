import { GetterTree } from "vuex";
import { UserViewModel } from "@/store/modules/auth/types";
import isEmpty from "lodash.isempty";

const authGetters: GetterTree<UserViewModel, UserViewModel> = {
    isAuthenticated: state => !isEmpty(state.login)
};

export default authGetters;