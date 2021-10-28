import Vuex from "vuex";
import auth from "./modules/auth";

const rootStore = new Vuex.Store({
    devtools: true,
    modules: {
        auth
    }
});

export default rootStore;
