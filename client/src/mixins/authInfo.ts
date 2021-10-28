import { ComponentOptionsMixin } from "vue";
import { mapState } from "vuex";
import isEmpty from "lodash.isempty";
import rootStore from "@/store";

export const authInfo: ComponentOptionsMixin = {
    computed: mapState({
        isAuthenticated(state: typeof rootStore.state) {
            return !isEmpty(state.auth.login);
        }
    })
};