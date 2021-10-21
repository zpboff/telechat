import { Store } from "vuex";
import auth from "./modules/auth";

export default new Store({
    modules: {
        auth
    }
});
