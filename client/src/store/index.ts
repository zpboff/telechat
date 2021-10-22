import Vuex from "vuex";
import auth from "./modules/auth";

export default new Vuex.Store({
    devtools: true,
    modules: {
        auth
    }
});
