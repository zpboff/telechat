import { Store } from "vuex";
import auth from "./modules/auth";
import test from "./modules/test";

export default new Store({
    modules: {
        auth,
        test
    }
});
