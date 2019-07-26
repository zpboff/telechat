import AuthStore from "./authStore";

export default class RootStore {
    constructor() {
        this.auth = new AuthStore(this);
    }
}
